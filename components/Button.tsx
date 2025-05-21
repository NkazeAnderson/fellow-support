import React, { PropsWithChildren } from "react";
import { ButtonSpinner, Button as GlueButton } from "./ui/button";

const Button = ({
  children,
  isSubmitting,
  ...rest
}: Required<PropsWithChildren> &
  React.ComponentPropsWithRef<typeof GlueButton> & {
    isSubmitting?: boolean;
  }) => {
  return (
    <GlueButton {...rest}>
      {isSubmitting && <ButtonSpinner />}
      {children}
    </GlueButton>
  );
};

export default Button;
