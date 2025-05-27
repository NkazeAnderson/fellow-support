import React, { PropsWithChildren } from "react";
import { ButtonSpinner, Button as GlueButton } from "./ui/button";

const Button = ({
  children,
  isSubmitting,
  isDisabled,
  ...rest
}: Required<PropsWithChildren> &
  React.ComponentPropsWithRef<typeof GlueButton> & {
    isSubmitting?: boolean;
  }) => {
  return (
    <GlueButton isDisabled={isDisabled || isSubmitting} {...rest}>
      {isSubmitting && <ButtonSpinner />}
      {children}
    </GlueButton>
  );
};

export default Button;
