import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CardContainer, SearchContainer, Form, Input } from "./Styles";
import styled from "styled-components";

export default function App() {
  const [data, setData] = useState([]);

  const [input, setInput] = useState({
    value: "",
  });

  const { value } = input;

  const handleChanged = ({ target }) => {
    if(target.value===''){
      setInput({
        ...input,
        value:''
      })
      getAll();
    } else {
      setInput({
        ...input, 
        [target.name]: target.value,
      });
      axios
        .get(`https://crud-games-api.herokuapp.com/games/getAll`)
        .then((res) => {
          setData(res.data.data.filter((e) => e.name.toLowerCase().includes(value.toLowerCase())));
        })
        .catch((err) => console.log(`${err}`));
    }
  };

  const getAll = () => {
    axios
      .get(`https://crud-games-api.herokuapp.com/games/getAll`)
      .then((res) => {
         setData(res.data.data);
      })
      .catch((err) => console.log(`${err}`));
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <SearchContainer>
        <Form>
          <Input
            name="value"
            type="text"
            value={value}
            placeholder="Busca por nombre"
            autocomplete="off"
            onChange={handleChanged}
          />
        </Form>
      </SearchContainer>
      <CardContainer>
        {
          data.map((game, index) => (
            <Card sx={{ width: 270 }} key={index}>
             <CardActionArea>
               <CardMedia
                 component="img"
                 height="auto"
                 image={game.cover}
                 alt="green iguana"
               />
               <CardContent>
                 <Typography gutterBottom variant="h4" component="div">
                   {game.name} $ {game.price}
                 </Typography>
                 <Typography sx={{ fontSize: 20 }} color="text.secondary">
                   {game.description}
                 </Typography>
               </CardContent>
             </CardActionArea>
            </Card>
            ))
        }
      </CardContainer>
    </>
  );
};



