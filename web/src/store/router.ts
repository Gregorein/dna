import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const PAGES = {
  LANDING: "landing",
  LOGIN: "login",
  REGISTER: "register",
  HOME: "home",
  TOP_UP: "top-up",
  ERROR: "error",
	SETTINGS: "settings",
	FESTIVAL: "festival"
} as const;

export type Page = (typeof PAGES)[keyof typeof PAGES];

const ROUTING = {
  "/": PAGES.LANDING,
  "/start": PAGES.LANDING,
  "/register": PAGES.REGISTER,
  "/sign-up": PAGES.REGISTER,
  "/login": PAGES.LOGIN,
  "/sign-in": PAGES.LOGIN,
  "/home": PAGES.HOME,
  "/top-up": PAGES.TOP_UP,
	"/settings": PAGES.SETTINGS,
	"/festival": PAGES.FESTIVAL
} satisfies Record<string, Page>;

export type Route = keyof typeof ROUTING;

const isRoute = (arg: string): arg is Route => {
  return Object.keys(ROUTING).includes(arg);
};

export const getPageFromUrl = (): Page => {
  const url = window.location.pathname;
  if (isRoute(url)) {
    return ROUTING[url];
  }

  return PAGES.ERROR;
};

export interface RouterState {
  page: Page;
	activeFestival?: string
}

const initialState: RouterState = {
  page: getPageFromUrl(),
	activeFestival: undefined
};

export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    navigate: {
			reducer: (state, action: PayloadAction<(Route | string)[]>) => {
				const [route, ...args] = action.payload;

				window.history.pushState(undefined, route);		
				state.page = ROUTING[(route as Route)];

				if(route === "/festival") {
					state.activeFestival = args[0]
				}
			},
			prepare: (...args:any) => {
				return {
					payload: args
				}
			},
		},
    onBrowserEvent: (state) => {
      state.page = getPageFromUrl();
    },
  },
});

// Action creators are generated for each case reducer function
export const { navigate, onBrowserEvent } = routerSlice.actions;

export default routerSlice.reducer;
