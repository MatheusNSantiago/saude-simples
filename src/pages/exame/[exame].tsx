import { useRouter } from "next/router";

type Props = {};
const Exame = (props: Props) => {
    const router = useRouter();

    const {exame} = router.query;

    return <div>{exame}</div>;
};
export default Exame;
