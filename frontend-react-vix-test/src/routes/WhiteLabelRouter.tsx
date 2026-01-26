import { PrivatePage } from "../auth/PrivatePage";
import { SettingsPage } from "../pages/Settings";

export const WhiteLabelRouter = {
  path: "/settings",
  element: (
    <PrivatePage>
      <SettingsPage />
    </PrivatePage>
  ),
};
