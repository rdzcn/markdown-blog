import { Transaction, TransactionStatus, Values } from "@types/index";

export enum Status {
  Idle = "idle",
  Loading = "loading",
  // Success = "success",
  // Error = "error",
}

export enum Event {
  InitialFetch = "INITIAL_FETCH",
  UpdateFilters = "UPDATE_FILTERS",
  UpdatePagination = "UPDATE_PAGINATION",
  FetchSuccess = "FETCH_SUCCESS",
  FetchError = "FETCH_ERROR",
}

interface DashboardState {
  status: Status;
  data: Transaction[];
  error: any;
  total: number;
  offset: number;
  limit: number;
  filters: {
    status: TransactionStatus | undefined;
  };
}

interface DashboardEvent {
  type: Event;
  payload?: any;
}

const dashboardReducer = (
  state: DashboardState,
  event: DashboardEvent,
): DashboardState => {
  switch (state.status) {
    case Status.Idle:
      switch (event.type) {
        case Event.InitialFetch:
          return { ...state, status: Status.Loading };
        case Event.UpdateFilters:
          return { ...state, status: Status.Loading, filters: event.payload };
        case Event.UpdatePagination:
          return {
            ...state,
            status: Status.Loading,
            offset: event.payload.offset,
          };
        default:
          return state;
      }
    case Status.Loading:
      switch (event.type) {
        case Event.FetchSuccess:
          return {
            ...state,
            status: Status.Idle,
            data: event.payload.data,
            total: event.payload.total,
            offset: event.payload.offset,
            limit: event.payload.limit,
          };
        case Event.FetchError:
          return { ...state, status: Status.Idle, error: event.payload };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default dashboardReducer;
