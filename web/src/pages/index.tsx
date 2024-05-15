import { ComponentType } from "react";
import { useStoreSelector, Page as PageType, PAGES } from "../store";
import { LandingPage } from "./LandingPage";
import { RegistrationPage } from "./RegistrationPage";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { TopUpPage } from "./TopUpPage";
import { ErrorPage } from "./ErrorPage";
import { SettingsPage} from "./SettingsPage";
import { FestivalPage} from "./FestivalPage";

const PAGE_COMPONENT: Record<PageType, ComponentType> = {
  [PAGES.LANDING]: LandingPage,
  [PAGES.LOGIN]: LoginPage,
  [PAGES.HOME]: HomePage,
  [PAGES.REGISTER]: RegistrationPage,
  [PAGES.TOP_UP]: TopUpPage,
  [PAGES.ERROR]: ErrorPage,
	[PAGES.SETTINGS]: SettingsPage,
	[PAGES.FESTIVAL]: FestivalPage
};

export const Page = () => {
  const page = useStoreSelector((store) => store.router.page);
  const PageComponent = PAGE_COMPONENT[page] || ErrorPage;

  return <PageComponent />;
};
