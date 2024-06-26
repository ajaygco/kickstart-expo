// bunx jest source/components/shared/__tests__/when-offline.shared.test.jsx

import React from "react";
import { useIsConnected } from "react-native-offline";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import { WhenOffline } from "components/shared/when-offline.shared";

jest.mock("react-native-offline", () => ({
  useIsConnected: jest.fn(),
}));

describe("WhenOffline", () => {
  it("should render children when offline", () => {
    useIsConnected.mockReturnValueOnce(false);

    const wrapper = render(
      <WhenOffline>
        <Text>Offline Content</Text>
      </WhenOffline>,
    );

    const contentElement = wrapper.getByText("Offline Content");

    expect(contentElement).toBeTruthy();

    expect(wrapper).toMatchSnapshot();
  });

  it("should render nothing when online", () => {
    useIsConnected.mockReturnValueOnce(true);

    const wrapper = render(
      <WhenOffline>
        <Text>Offline Content</Text>
      </WhenOffline>,
    );

    const contentElement = wrapper.queryByText("Offline Content");

    expect(contentElement).toBeNull();

    expect(wrapper).toMatchSnapshot();
  });
});
