import {
    Input,
    FormLabel,
    InputGroup,
    InputLeftElement,
    FormControl,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type CustomInputProps = {
    onChange: CallableFunction;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    icon?: ReactNode;
    formLabel?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
};

const CustomInput = ({
    placeholder,
    onChange,
    type = "text",
    icon,
    formLabel,
    isRequired = false,
    isDisabled = false,
}: CustomInputProps) => {
    return (
        <FormControl isDisabled={isDisabled} isRequired={isRequired}>
            {formLabel && <FormLabel>{formLabel}</FormLabel>}
            <InputGroup>
                {icon && (
                    <InputLeftElement pointerEvents="none">
                        {icon}
                    </InputLeftElement>
                )}
                <Input
                    type={type}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                />
            </InputGroup>
        </FormControl>
    );
};

export default CustomInput;
