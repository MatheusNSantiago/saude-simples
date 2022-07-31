import {
    Input,
    FormLabel,
    InputGroup,
    InputLeftElement,
    FormControl,
    InputRightAddon,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type CustomInputProps = {
    onChange: CallableFunction;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    leftElement?: ReactNode;
    rightElement?: ReactNode | string;
    label?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
};

const CustomInput = ({
    placeholder,
    onChange,
    type = "text",
    leftElement,
    rightElement,
    label,
    isRequired = false,
    isDisabled = false,
}: CustomInputProps) => {
    return (
        <FormControl isDisabled={isDisabled} isRequired={isRequired}>
            {label && <FormLabel fontFamily={"monospace"}>{label}</FormLabel>}

            <InputGroup>
                {leftElement && (
                    <InputLeftElement pointerEvents="none">
                        {leftElement}
                    </InputLeftElement>
                )}
                <Input
                    type={type}
                    variant="outline"
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                />
                {rightElement && (
                    <InputRightAddon
                        bg="blackAlpha.100"
                        fontSize={"sm"}
                        fontFamily={"monospace"}
                        pointerEvents="none"
                    >
                        {rightElement}
                    </InputRightAddon>
                )}
            </InputGroup>
        </FormControl>
    );
};

export default CustomInput;
