import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import Edit from "./Edit";

// import Db from '../../server/db.json';

function Records(props) {
  const { dbData } = props;
  // console.log(dbData);
  const [editShow,seteditShow] = useState(false);
  const [editUser,seteditUser] = useState(null);
  // const [idsToDelete, setIdsToDelete] = useState([]);
  // console.log(idsToDelete);

  let arrayId = [];
  const setIdToDelete = (id) => {
    arrayId.push(id);
    props.onSetIdsToDelete(arrayId);
  };

  // setIdsToDelete(arrayId);
  // console.log(idsToDelete);
  //function for delete
  const idToEdit = (node) => {
    console.log(node);
    seteditUser(node);
    seteditShow(true);
  };

  return (
    <>
      <div>
        <p>
          {" "}
          <b>--RECORDS--</b>
        </p>

        {dbData &&
          dbData.map((info) => {
            return (
              <form>
                <input
                  onChange={(event) => {
                    setIdToDelete(info.id);
                  }}
                  type="checkbox"
                />
                <br />
                <label htmlFor="">
                  <strong>ID: </strong>
                </label>
                <b>{info.id}</b>
                <br />
                <label htmlFor="">Deparment: </label>
                {info.formValues.department}
                <br />
                <label htmlFor="">Designation: </label>
                {info.desValue.designation}
                <br />
                <label htmlFor="">State: </label>
                {info.stateValue.States}
                <br />
                <label htmlFor="">District: </label>
                {info.districtValue.districts}
                <br></br>
                <input
                  type="button"
                  onClick={() => {
                    idToEdit(info.id)
                    // idToEdit(info.id,info.formValues.department,info.desValue.designation ,info.stateValue.States ,info.districtValue.districts )
                  }}
                  style={{
                    align: "center",  
                    padding: "5px",
                    margin: "10px 0px 0px 10px",
                    color: "white",
                    background: "green",
                  }}
                  value="Edit"
                />
                 <Dialog
                      open={editShow}
                      onClose={()=>{seteditShow(false)}}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      className = "editDialog"
                  >
                        <Edit
                          isEdit={editUser}
                        />
                  </Dialog>
              </form>
            );
          })}
      </div>
      <br />
      <br />
    </>
  );
}

export default Records;
