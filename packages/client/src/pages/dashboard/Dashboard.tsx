import DataGrid from "@components/dataGrid/DataGrid";
import { Txt } from "@contexts/texts.context";
import { useToast } from "@contexts/toast.context";
import { Button } from "@mui/material";
import { fetchTransactions } from "@shared/apis/interceptors";
import { localizeValue, normalizeData } from "@shared/utils";
import type { Transaction, TransactionStatus } from "@@types/index";
import { format } from "date-fns";
import {
  type ChangeEvent,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import Filter from "./components/Filter";
import MerchantLogo from "./components/MerchantLogo";
import TransactionDetails from "./components/TransactionDetails";
import dashboardReducer, { Event, Status } from "./dashboard.reducer";
import { DashboardWrapper, FilterContainer } from "./dashboard.styles";

const statusFilterOptions = [
  { id: "REJECTED", label: "Rejected" },
  { id: "PENDING", label: "Pending" },
  { id: "COMPLETED", label: "Completed" },
];

const initialFilters: {
  status: TransactionStatus | undefined;
} = {
  status: undefined,
};

const Dashboard = () => {
  const [transactionId, setTransactionId] = useState<string>("");
  const [state, dispatch] = useReducer(dashboardReducer, {
    status: Status.Idle,
    data: [],
    error: null,
    total: 0,
    offset: 0,
    limit: 10,
    filters: { ...initialFilters },
  });

  const { addToast } = useToast();

  const normalizedTransactions = useMemo(
    () => normalizeData<Transaction>(state.data, "id"),
    [state.data],
  );

  const getTransactions = async ({
    offset = 0,
    filters = initialFilters,
  }: {
    offset?: number;
    filters?: { status: TransactionStatus | undefined };
  }) => {
    try {
      const response = await fetchTransactions({
        offset: offset,
        limit: state.limit,
        status: filters.status,
      });
      dispatch({
        type: Event.FetchSuccess,
        payload: {
          data: response.data,
          total: response.meta.total,
          offset: response.meta.offset,
          limit: response.meta.limit,
        },
      });
    } catch (error) {
      addToast({ txtKey: "error.failFetchTransactions" });
    }
  };

  useEffect(() => {
    if (state.status === Status.Idle) {
      dispatch({ type: Event.InitialFetch });
      getTransactions({ offset: state.offset, filters: state.filters });
    }
  }, []);

  const memoizedColumns = useMemo(() => {
    return [
      {
        field: "transactionTime",
        headerName: "Time",
        flex: 1,
        minWidth: 150,
        renderCell: ({ row }: { row: Transaction }) => {
          return <Txt txtKey={format(row.transactionTime, "dd MMM yyyy")} />;
        },
      },
      {
        field: "merchantName",
        headerName: "Merchant name",
        flex: 1,
        minWidth: 150,
        renderCell: ({ row }: { row: Transaction }) => {
          return (
            <>
              <MerchantLogo
                iconUrl={row.merchantIconUrl}
                name={row.merchantName}
              />
              <Txt txtKey={row.merchantName} ml={2} />
            </>
          );
        },
      },
      {
        field: "amount",
        headerName: "Amount",
        flex: 1,
        minWidth: 150,
        renderCell: ({ row }: { row: Transaction }) => {
          return <Txt txtKey={localizeValue(+row.amount, row.currency)} />;
        },
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 150,
        renderCell: ({ row }: { row: Transaction }) => {
          return <Txt txtKey={`transactionStatus.${row.status}`} />;
        },
      },
      {
        field: "rejectionReason",
        headerName: "Rejection reason",
        flex: 1,
        minWidth: 150,
        renderCell: ({ row }: { row: Transaction }) => {
          return (
            <Txt
              txtKey={
                row.rejectionReason
                  ? `rejectionReason.${row.rejectionReason}`
                  : "-"
              }
            />
          );
        },
      },
    ];
  }, []);

  const filterHandler = ({
    filterType,
    filterValue,
  }: {
    filterType: "status";
    filterValue: TransactionStatus;
  }) => {
    dispatch({
      type: Event.UpdateFilters,
      payload: { [filterType]: filterValue },
    });
    getTransactions({
      offset: 0,
      filters: { ...state.filters, [filterType]: filterValue },
    });
  };

  return (
    <DashboardWrapper>
      <Txt txtKey="dashboard.title" variant="h4" mb={2} fontWeight={"bold"} />
      <FilterContainer>
        <Filter
          statuses={statusFilterOptions}
          filterHandler={filterHandler}
          selectedFilter={state.filters.status}
        />
        <Button
          variant="text"
          onClick={() => {
            dispatch({
              type: Event.UpdateFilters,
              payload: { ...initialFilters },
            });
            getTransactions({ offset: 0, filters: initialFilters });
          }}
        >
          <Txt txtKey="dashboard.clearFilters" variant="button" />
        </Button>
      </FilterContainer>

      <DataGrid
        rows={state.data}
        columns={memoizedColumns}
        loading={state.status === Status.Loading}
        onRowClick={({ row: { id } }) => setTransactionId(id)}
        onPageChange={(event: ChangeEvent<unknown>, newPage: number) => {
          getTransactions({
            offset: (newPage - 1) * state.limit,
            filters: state.filters,
          });
          dispatch({
            type: Event.UpdatePagination,
            payload: { offset: (newPage - 1) * state.limit },
          });
        }}
        page={Math.floor(state.offset / state.limit) + 1}
        totalPage={Math.ceil(state.total / state.limit)}
        paginationMode="server"
      />
      {transactionId ? (
        <TransactionDetails
          isOpen={!!transactionId}
          close={() => setTransactionId("")}
          transaction={
            normalizedTransactions.byId[transactionId] as Transaction
          }
        />
      ) : null}
    </DashboardWrapper>
  );
};

export default Dashboard;
