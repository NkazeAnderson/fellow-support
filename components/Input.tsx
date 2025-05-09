import { Textarea, TextareaInput } from "@/components/ui/textarea";

import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import {
  Input as GlueInput,
  InputField,
  InputIcon,
} from "@/components/ui/input";
import { IInputFieldProps } from "@gluestack-ui/input/lib/types";
import { AlertCircleIcon } from "lucide-react-native";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Pressable, TextInputProps } from "react-native";

interface TextInputPropsI extends IInputFieldProps, TextInputProps {
  iconLeft?: {
    icon: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
    onIconPress?: VoidFunction;
  };
  iconRight?: {
    icon: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
    onIconPress?: VoidFunction;
  };
  type: "text" | "password";
  className?: string;
}

interface TextAreaInputPropsI extends IInputFieldProps, TextInputProps {
  type: "textArea";
  className?: string;
}

const TextInput = ({
  iconLeft,
  iconRight,
  className,
  ...rest
}: TextInputPropsI & {
  onChangeText(e: string): void;
  value: string;
}) => {
  return (
    <GlueInput className={className}>
      {iconLeft && (
        <Pressable onPress={iconLeft.onIconPress} className="mx-2">
          <InputIcon as={iconLeft.icon} />
        </Pressable>
      )}
      <InputField {...rest} />
      {iconRight && (
        <Pressable onPress={iconRight.onIconPress} className="mx-2">
          <InputIcon as={iconRight.icon} />
        </Pressable>
      )}
    </GlueInput>
  );
};
const TextAreaInput = ({
  type,
  ...rest
}: TextAreaInputPropsI & {
  onChangeText(e: string): void;
  value: string;
}) => {
  return (
    <Textarea>
      <TextareaInput type="text" {...rest} />
    </Textarea>
  );
};
function Input<T extends FieldValues>(props: {
  control: Control;
  name: Path<T>;
  label?: string;
  labelClassName?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  isRequired?: boolean;
  specifics: TextInputPropsI | TextAreaInputPropsI;
}) {
  return (
    <FormControl
      isInvalid={false}
      size={props.size ?? "md"}
      isDisabled={props.isDisabled}
      isRequired={props.isRequired}
    >
      {props.label && (
        <FormControlLabel>
          <FormControlLabelText className={props.labelClassName}>
            {props.label}
          </FormControlLabelText>
        </FormControlLabel>
      )}

      <Controller
        control={props.control}
        name={props.name}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          if (
            props.specifics.type === "password" ||
            props.specifics.type === "text"
          ) {
            return (
              <TextInput
                {...props.specifics}
                onChangeText={onChange}
                value={value}
              />
            );
          } else if (props.specifics.type === "textArea") {
            return (
              <TextAreaInput
                {...props.specifics}
                onChangeText={onChange}
                value={value}
              />
            );
          } else {
            return <></>;
          }
        }}
      />

      {props.helperText && (
        <FormControlHelper>
          <FormControlHelperText>{props.helperText}</FormControlHelperText>
        </FormControlHelper>
      )}
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>
          Atleast 6 characters are required.
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
export default Input;
