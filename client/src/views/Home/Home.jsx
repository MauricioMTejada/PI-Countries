import CardsContainer from "../../components/CardsContainer/CardsContainer";
import NavBar from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName, getPaises } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const paises = useSelector((state) => state.paises);
  console.log(paises);
  const [searchString, setSearchString] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setSearchString(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getByName(searchString));
  }

  useEffect(() => {
    dispatch(getPaises());
  }, [dispatch]);

  return (
    <div>
      <h1>Esta es la vista de Home</h1>
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      <CardsContainer paises={paises} />
    </div>
  );
};

export default Home;
