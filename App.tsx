import React from "react";
import { StatusBar } from "react-native";
import {
  BatchSize,
  DatadogProvider,
  DatadogProviderConfiguration,
  SdkVerbosity,
  UploadFrequency,
} from "@datadog/mobile-react-native";

const config = new DatadogProviderConfiguration(
  process.env.DD_CLIENT_TOKEN as string,
  ".env",
  process.env.DD_RUM_APPLICATION_ID as string,
  true, // track User interactions (e.g.: Tap on buttons. You can use 'accessibilityLabel' element property to give tap action the name, otherwise element type will be reported)
  true, // track XHR Resources
  true // track Errors
);
// Optional: Select your Datadog website (one of "US1", "EU1", "US3", "US5", "AP1" or "GOV")
config.site = "EU1";
// Optional: Enable JavaScript long task collection
config.longTaskThresholdMs = 100;
// Optional: enable or disable native crash reports
config.nativeCrashReportEnabled = true;
// Optional: sample RUM sessions (here, 100% of session will be sent to Datadog. Default = 100%)
config.sampleRate = 100;

if (__DEV__) {
  // Optional: Send data more frequently
  config.uploadFrequency = UploadFrequency.FREQUENT;
  // Optional: Send smaller batches of data
  config.batchSize = BatchSize.SMALL;
  // Optional: Enable debug logging
  config.verbosity = SdkVerbosity.DEBUG;
}

import { Home } from "./src/pages/Home";

export default function App() {
  return (
    <DatadogProvider configuration={config}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Home />
    </DatadogProvider>
  );
}
