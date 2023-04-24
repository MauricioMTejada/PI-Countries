import CardsContainer from "../../components/CardsContainer/CardsContainer"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPaises } from "../../redux/actions";

const Home = () => {

    const dispatch  = useDispatch();

    useEffect(() => {
        dispatch(getPaises())
    },[dispatch])

    return (
        <>
        <h1>Esta es la vista de  Home</h1>
        <CardsContainer />
        </>
    )
}

export default Home;