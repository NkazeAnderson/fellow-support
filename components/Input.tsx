import { ChevronDownIcon } from "@/components/ui/icon";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";

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
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { IInputFieldProps } from "@gluestack-ui/input/lib/types";
import { ISelectItemProps } from "@gluestack-ui/select/lib/types";
import { AlertCircleIcon } from "lucide-react-native";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Pressable, TextInputProps } from "react-native";

interface controlI {
  onChangeText(e: string): void;
  value: string;
}

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
interface SelectInputPropsI
  extends IInputFieldProps,
    Omit<ISelectItemProps, "label" | "value">,
    TextInputProps {
  type: "select";
  className?: string;
  options: { value: string; displayText: string }[];
}
const TextInput = ({
  iconLeft,
  iconRight,
  className,
  ...rest
}: TextInputPropsI & controlI) => {
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

const TextAreaInput = ({ type, ...rest }: TextAreaInputPropsI & controlI) => {
  return (
    <Textarea>
      <TextareaInput type="text" {...rest} />
    </Textarea>
  );
};

const SelectionInput = ({
  type,
  options,
  onChangeText,
  className,
  value,
  ...rest
}: SelectInputPropsI & controlI) => {
  return (
    <Select onValueChange={onChangeText}>
      <SelectTrigger>
        <SelectInput className={`py-0 ${className}`} {...rest} />
        <SelectIcon className="mr-3 ml-auto" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {options.map((item) => (
            <SelectItem
              key={item.value}
              label={item.displayText}
              value={item.value}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

function Input<T extends FieldValues>(props: {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  labelClassName?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  isRequired?: boolean;
  errors: FieldErrors<T>;
  specifics: TextInputPropsI | TextAreaInputPropsI | SelectInputPropsI;
}) {
  return (
    <FormControl
      isInvalid={props.errors && props.errors[props.name] ? true : false}
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
          } else if (props.specifics.type === "select") {
            return (
              <SelectionInput
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
      {props.errors[props.name]?.message && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>
            {props.errors[props.name]?.message as string}
          </FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
}
export default Input;
