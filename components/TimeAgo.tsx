import React, { PropsWithChildren } from "react";
import { Text } from "react-native";

import ReactTimeAgo from "react-time-ago";

function Time(props: PropsWithChildren) {
  console.log(props);

  return <Text>{props.children}</Text>;
}

const TimeAgo = ({ date }: { date: string }) => {
  return <ReactTimeAgo date={new Date(date)} component={Time} />;
};

export default TimeAgo;
