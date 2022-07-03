import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

const Edit = (props) => {
  const [department,setdepartment] = useState(null);
  const [district,setdistrict] = useState(null);
  const [state,setstate] = useState(null);
  const [designation,setdesignation] = useState(null);
  // var editDataObj = props.editjsxData;
  // console.log(editDataObj);
  // console.log(props.editjsxData);
  // console.log(editArray.stateValues.States);
  const idToEdit = (node) => {
    props.onEdit(node);
    console.log(idToEdit);
  };
  const editData = (id) => {
    console.log(id);
    return id;

  };


  // const [stateEdit, setStateEdit] = useState({
  //   data: {
  //     formValues: {
  //       department: "",
  //     },
  //     desValue: {
  //       designation: "",
  //     },
  //     stateValue: {
  //       States: "",
  //     },
  //     districtValue: {
  //       districts: "",
  //     },
  //     id: ""
  //   }
  // });


  useEffect(() => {
    getData();
  }, [props.isEdit]);

  const getData = async () => {
    let a = await axios.get(`http://localhost:9089/data/${props.isEdit}`);
    console.log(a);
    a.data && a.data.stateValue && setstate(a.data.stateValue.States);
    a.data && a.data.desValue && setdesignation(a.data.desValue.designation);
    a.data && a.data.districtValue && setdistrict(a.data.districtValue.districts);
    a.data && a.data.formValues && setdepartment(a.data.formValues.department);
    // setStateEdit({
    //   ...stateEdit,
    //   data: a.data,
    // });
  };

  let updateInput = (event,e) => {
    // console.log(e);

    // event === "department"? setdepartment():"";
    // setStateEdit({
    //   ...stateEdit,
    //   data: {
    //     ...stateEdit.data,
    //     [event.target.formValues.department]:
    //       event.target.formValues.department.value,
    //   },
    // });
  };

  async function postData() {
    let data = {
      "formValues": {
        "department": department
      },
      "desValue": {
        "designation": designation
      },
      "stateValue": {
        "States": state
      },
      "districtValue": {
        "districts": district
      },
      "id": props.isEdit
    }
    const response = await fetch(`http://localhost:9089/data/${props.isEdit}`, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  let submitForm = async (e) => {
    e.preventDefault();
    props.postDB(e);
    await axios.get(`http://localhost:9089/data/${props.isEdit}`)
    postData();
  };

  return (
    <div className="row form">
      <form onSubmit={submitForm} className="col-md-12">
        <div className="col-md-3">
          <input
            name="department"
            value={department}
            onChange={(e)=>setdepartment(e.target.value)}
            type="text"
            placeholder="Deparment"
          />
        </div>

        <div className="mb-2">
          <input
            required={true}
            name="designation"
            value={designation}
            onChange={(e)=>setdesignation(e.target.value)}
            type="text"
            placeholder="Designation"
          />
        </div>

        <div className="mb-2">
          <input
            required={true}
            name="state"
            value={state}
            onChange={(e)=>setstate(e.target.value)}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="mb-2">
          <input
            required={true}
            name="District"
            value={district}
            onChange={(e)=>setdistrict(e.target.value)}
            type="text"
            placeholder="District"
          />
        </div>
        <Button onClick={()=>{postData()}} variant="outlined">Submit</Button>
      </form>
    </div>
  );
};

export default Edit;
