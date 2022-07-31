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
    value?: string;
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
    value,
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
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                />
                {rightElement && (
                    <InputRightAddon
                        bg="blackAlpha.100"
                        fontSize={"sm"}
                        minW={16}
                        p={1}
                        justifyContent={"center"}
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
