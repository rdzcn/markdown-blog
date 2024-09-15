import {
	DataGrid,
	type GridActionsColDef,
	type GridApi,
	type GridColDef,
	type GridEventListener,
	type GridInitialState,
	type GridRowParams,
	type GridRowsProp,
} from "@mui/x-data-grid";
import { ChangeEvent, MouseEvent, type MutableRefObject } from "react";
import CustomPagination from "./components/CustomPagination";
import { GridWrapper } from "./datagrid.styles";

interface DataGridProps {
	rows: GridRowsProp;
	columns: Array<GridColDef | GridActionsColDef>;
	onRowClick?: (row: GridRowParams) => void;
	initialState?: GridInitialState;
	loading?: boolean;
	isAutoHeight?: boolean;
	disableFilter?: boolean;
	disableSearch?: boolean;
	apiRef?: MutableRefObject<GridApi>;
	page?: number;
	totalPage?: number;
	pageSize?: number;
	onPageChange?: (event: any, newPage: number) => void;
	paginationMode?: "client" | "server";
}

const DataGridTable = ({
	rows,
	columns,
	onRowClick = undefined,
	initialState,
	loading,
	isAutoHeight,
	disableFilter = false,
	disableSearch = false,
	apiRef,
	totalPage = 1,
	page = 1,
	onPageChange = () => {},
}: DataGridProps) => {
	const onRowClicked: GridEventListener<"rowClick"> = (params) => {
		if (onRowClick) {
			onRowClick(params);
		}
	};

	return (
		<GridWrapper $isAutoHeight={isAutoHeight} $isRowClickable={!!onRowClick}>
			<DataGrid
				apiRef={apiRef}
				isRowSelectable={(params: GridRowParams) => params.row.isRowSelectable}
				rows={rows}
				columns={columns}
				slots={{
					pagination: CustomPagination,
				}}
				onRowClick={onRowClicked}
				pageSizeOptions={[0]}
				slotProps={{
					toolbar: {
						csvOptions: {
							disableToolbarButton: true,
						},
						disableFilter: !!disableFilter,
						disableSearch: !!disableSearch,
						disableDownload: true,
					},
					pagination: {
						count: totalPage,
						page: !totalPage || totalPage <= 0 ? 0 : page,
						onPageChange,
					},
				}}
				loading={loading}
				getEstimatedRowHeight={() => 60}
				{...(initialState && { initialState: initialState })}
				rowHeight={60}
				disableColumnMenu
				disableDensitySelector
				disableColumnSelector
			/>
		</GridWrapper>
	);
};

export default DataGridTable;
