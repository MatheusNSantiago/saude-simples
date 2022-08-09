import {
    Box,
    BoxProps,
    Circle,
    HStack,
    VStack,
    Text,
    useMediaQuery,
    useBreakpointValue,
} from "@chakra-ui/react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type PieProps = {
    data: number[];
    labels: string[];
    props?: BoxProps;
};

function PieChart({ data, labels, props }: PieProps) {
    const offset = useBreakpointValue({ base: -5.5, sm: -2 });
    // Check if is mobile
    const isMobile = useMediaQuery("(max-width: 1068px)");
    /* Ver se isso aqui faz sentido de botar */
    /*     let ref = React.useRef<ChartJS<"pie">>(null);
    const [chart, setChart] = React.useState(ref.current);

    const renderLegend = () => {
        return (
            <VStack
                alignItems="flex-start"
                w="fit-content"
                pos="absolute"
                bottom={0}
                left="50%"
                transform="auto"
                translateX={"-50%"}
            >
                {ref.current?.legend?.legendItems!.map((item, index) => (
                    <HStack key={index}>
                        <Circle
                            background={item.fillStyle
                                ?.toString()
                                .replace(new RegExp(/.\d\.\d/g), "1")}
                            borderColor={item
                                .strokeStyle!.toString()
                                .replace(new RegExp(/.\d\.\d/g), "1")}
                            borderWidth={item.lineWidth + "px"}
                            display="inline-block"
                            size={3}
                        />
                        <Text fontSize={"sm"}>{item.text}</Text>
                    </HStack>
                ))}
            </VStack>
        );
    };
    React.useEffect(() => setChart(ref.current), [ref.current]); */

    const options: ChartOptions<"pie"> = {
        plugins: {
            legend: {
                position: "bottom",
                fullSize: false,
                labels: {
                    boxWidth: 6.5,
                    pointStyle: "circle",
                    usePointStyle: true,
                },
            },
            datalabels: {
                formatter(value, context) {
                    let total = 0;
                    context.dataset.data.forEach(
                        (value) => (total += value as number)
                    );
                    return (
                        ((value / total) * 100).toFixed(isMobile ? 0 : 1) + "%"
                    );
                },
                color: "black",
                anchor: "end",
                align: "start",
                offset: offset,
            },
            tooltip: {
                yAlign: "bottom",
                xAlign: "right",
                mode: "nearest",
                boxPadding: 5,
            },
        },
    };

    const _data: ChartData<"pie"> = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                ],
                hoverOffset: 10,
                borderColor: [
                    "rgba(255, 99, 131, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 2,
            },
        ],
    };
    return (
        <Box pos="relative" {...props}>
            <Pie
                style={{
                    position: "absolute",
                    bottom: "47.5%",
                    transform: "translateY(50%)",
                }}
                data={_data}
                options={options}
                plugins={[ChartDataLabels]}
            />
        </Box>
    );
}
export default PieChart;
