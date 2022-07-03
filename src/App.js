import { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import Submit from "./components/Submit";
import axios from "axios";
import Records from "./components/Records";
import Edit from "./components/Edit";

function App() {
  const [formValues, setFormValues] = useState({});
  const [desValue, setdesValue] = useState({});

  const [stateValue, setStateValue] = useState({});
  const [districtValue, setDistValue] = useState({});

  const [dbData, setDbData] = useState([]);

  const [finalData, setFinalData] = useState({
    formValues: [],
    desValue: [],
    stateValue: [],
    districtValue: [],
  });

  // create new state for receiving data from GET request
  // run GET request in separate useEffect()
  // when data, set state with GET data

  // useEffect(() => {
  //   getToDB()
  //     .then((data) => {
  //       console.log(data);
  //       setDbData(data);
  //     })
  //     .catch(console.error);
  // }, []);

  //clearForm

  const clearForm = () => {
    setFormValues();
    setdesValue();
    setStateValue();
    setDistValue();
  };

  useEffect(() => {
    setFinalData({
      ...finalData,
      formValues,
      desValue,
      stateValue,
      districtValue,
    });
  }, [formValues, desValue, stateValue, districtValue]);

  const handleSelected = (selected) => {
    // console.log(selected);
    setFormValues({ department: selected });
  };
  const handleSelected1 = (selected) => {
    // console.log(selected);
    setdesValue({ designation: selected });
  };

  const handleSelected2 = (selectedState) => {
    // console.log(selectedState);
    setStateValue({ States: selectedState });
  };
  const handleSelected3 = (districtValue) => {
    // console.log(districtValue);
    setDistValue({ districts: districtValue });
  };

  const getData = () => {
    axios.get("http://localhost:9089/data").then((res) => {
      setDbData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getToDB = async (id) => {
    return await axios.get(`http://localhost:9089/data${id}`);
    // setDbData(res.data);
  };
  // console.log(dbData);

  const postToDB = async () => {
    axios.get("http://localhost:9089/data").then((res) => {
      setDbData(res.data);
    });

    // console.log(finalData);
    let postDb = await axios.post("http://localhost:9089/data", {
      ...finalData,
      id: "IC" + Math.trunc(Math.random() * 99),
    });

    getData();

    // console.log(postDb.data);
  };

  const [delId, setDelId] = useState("");
  const [idsToDelete, setIdsToDelete] = useState([]);

  const deleteData = async (id) => {
    // loop through idsToDelete array and make axios calls on each one of the id in the array

    const del = await axios.delete(`http://localhost:9089/data/${id}`);
    // console.log(del.data);
  };

  idsToDelete.forEach(deleteData);

  //for edit

  // const editData = (id) => {
  //   console.log(id);
  //   return id;

  // };

  // const [editData, setEditData] = useState([]);
  // const onEdit = (data) => {
  //   setEditData(data);
  // };
  // console.log(editData)

  const tupac = (id) => {
    // console.log(id);
    setDelId(id);
  };

  const handleSetIdsToDelete = (ids) => {
    // console.log(ids);
    setIdsToDelete((pre) => [...pre, ids[0]]);
    getData();
  };
  // console.log(idsToDelete);

  const justchecking = () => {
    // idsToDelete.forEach(deleteData);
    deleteData();
    getData();
  };

  return (
    <form>
      <Dropdown
        onSelect={handleSelected}
        onSelect1={handleSelected1}
        onSelect2={handleSelected2}
        onSelect3={handleSelected3}
      />
      {/* <Edit editData={editData}
       
        // postDB={postToDB}
      /> */}
      {/* <Submit
        clearForm={clearForm}
       
        // onFormSubmit1={handleFormSubmit1}
        // onFormSubmit2={handleFormSubmit2}
        // onFormSubmit3={handleFormSubmit3}
        // onFinSubmit={onFinalSubmit}
        // getDb={getToDB}
        postDB={postToDB}
        // onClick={() => {}}
      /> */}

      <Records
        dbData={dbData}
        parentTochild={tupac}
        onSetIdsToDelete={handleSetIdsToDelete}
      />
      <input
        type="button"
        // onClick={deleteData}
        onClick={justchecking}
        style={{
          align: "center",
          padding: "5px",
          margin: "0px 0px 0px 10px",
          color: "white",
          background: "red",
        }}
        value="Delete"
      />
    </form>
  );
}

export default App;
