import React, { useState } from "react";
import hat from "./upsideDownHat.png";
import "./Form.css";
import "./Coin.css";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";

const style = { justifyContent: "center" };

const Form = () => {
  const [name, setName] = useState("");
  const [chosenOne, setChosenOne] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [title, setTitle] = useState("");
  const [buttonWords, setButtonWords] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenTwo = () => {
    setOpenTwo(true);
  };

  const handleCloseTwo = () => {
    setOpenTwo(false);
  };

  const onDraw = () => {
    if (list && list.length > 2) {
      setChosenOne(list[Math.floor(Math.random() * list.length)]);
      setTitle("THE HAT HAS DECIDED");
      setButtonWords("DO IT AGAIN!");
      handleClickOpen();
      setList([]);
    } else if (list && list.length === 2) {
      setChosenOne(":|");
      setTitle("Why don't you flip a coin instead?");
      setButtonWords("Dogecoin?");
      handleClickOpenTwo();
    } else {
      setChosenOne("Hat can't pick from nothing");
      setTitle("...");
      setButtonWords("We all make mistakes.");
      handleClickOpen();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (list.includes(name)) {
          setTitle("Check your list");
          setChosenOne(name + " is already in the hat");
          setButtonWords("We all make mistakes.");
          handleClickOpen();
          setName("");
        } else if (!name) {
          setTitle("Whoa whoa whoa");
          setChosenOne("You can't put nothing in this hat.");
          setButtonWords("We all make mistakes.");
          handleClickOpen();
        } else {
          setList(list.concat(name));
          setName("");
        }
        e.currentTarget.autofocus = true;
      }}
    >
      <div className="mainContainer">
        <div className="row">
          <input
            autoFocus
            type="name"
            className="inputText"
            value={name}
            placeholder="Hat knows best "
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Add it to the Hat</button>
          <button type="reset" onClick={() => setList([])}>
            Empty the Hat.
          </button>
        </div>
      </div>
      <div>
        <ul className="List-container">
          {list.map((name) => (
            <li key={name}>
              <button
                className="name"
                onClick={() => setList(list.filter((n) => n !== name))}
              >
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <span className="tip">
        Hover over the Hat to shake it up.
        <br />
        Click the Hat and it will pick the very best choice
      </span>
      <div className="Hat-box">
        <div className="Hat-box-inner">
          {<img src={hat} className="Hat" alt="logo" onClick={onDraw} />}
        </div>
      </div>

      <div>
        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open alert dialog
        </Button> */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent style={style}>
            <DialogContentText id="alert-dialog-description">
              {chosenOne}
            </DialogContentText>
          </DialogContent>
          <DialogActions style={style}>
            <Button onClick={handleClose} color="primary" autoFocus>
              {buttonWords}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openTwo}
          onClose={handleCloseTwo}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent style={style}>
            <DialogContentText id="alert-dialog-description">
              {chosenOne}
            </DialogContentText>
            {/* <div id="coin">
              <div className="side-a">
                <h2>{list[0]}</h2>
              </div>
              <div className="side-b">
                <h2>{list[1]}</h2>
              </div>

              <h1>Flip a coin</h1>
              <button
                id="btn"
                onClick={() => {
                  alert("do a thing");
                }}
              >
                Coin Toss
              </button>
            </div> */}
          </DialogContent>
          <DialogActions style={style}>
            <Button onClick={handleCloseTwo} color="primary" autoFocus>
              {buttonWords}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
};

export default Form;
