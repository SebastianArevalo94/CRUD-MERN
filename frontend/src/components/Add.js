import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AddContainer, FormCard } from './Styles';
import { fileUpload } from '../helpers/fileUpload';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

export default function Add() {
  const [game, setGame] = useState({
    name: '',
    price: '',
    description: '',
    genre: '',
    platform: '',
  });

  const params = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState('');

  const [buttonInfo, setButtonInfo] = useState('');

  const [btnDisabled, setBtnDisabled] = useState(true);

  const { name, price, description, genre, platform } = game;

  const handleChanged = ({ target }) => {
    setGame({
      ...game,
      [target.name]: target.value,
    });
  };

  const handleFileChanged = (e) => {
    setBtnDisabled(true);
    const file = e.target.files[0];
    fileUpload(file)
      .then((resp) => {
        game.cover = resp;
        setBtnDisabled(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      HTTP_PUT(game);
    } else {
      HTTP_POST(game);
    }
  };

  const HTTP_POST = (obj) => {
    axios
      .post(`https://crud-games-api.herokuapp.com/games/createGame`, obj)
      .then(
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Juego agregado!',
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((err) => console.log(err));
      setGame({
        name: '',
        price: '',
        description: '',
        genre: '',
        cover: '',
        platform: '',
      });
      navigate(-1);
  };

  const HTTP_PUT = (obj) => {
    axios
      .put(`https://crud-games-api.herokuapp.com/games/updateGame/${params.id}`, obj)
      .then(
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Juego editado!',
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((err) => console.log(err));
      setGame({
        name: '',
        price: '',
        description: '',
        genre: '',
        cover: '',
        platform: '',
      });
      navigate(-1);
  };

  const getOne = (id) => {
    axios
      .get(`https://crud-games-api.herokuapp.com/games/getOne/${id}`)
      .then((res) => {

        setGame(res.data.data);
      })
      .catch((err) => console.log(`${err}`));
  }; 

  useEffect(() => {
    if (params.id) {
      getOne(params.id);
      setTitle('Editar Juego');
      setButtonInfo('Guardar Cambios');
      setBtnDisabled(false)
    } else {
      setTitle('Agregar Juego');
      setButtonInfo('Agregar');
    }
  }, []);

  return (
    <AddContainer>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <Card sx={{ width: 400 }}>
          <CardContent>
            <FormCard>
              <TextField
                id="outlined-multiline-flexible"
                label="Nombre"
                fullWidth
                type="text"
                name="name"
                onChange={handleChanged}
                value={name}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Precio"
                fullWidth
                multiline
                type="number"
                name="price"
                onChange={handleChanged}
                value={price}
              />
              <TextField
                id="filled-multiline-static"
                label="Descripcion"
                multiline
                rows={4}
                fullWidth
                type="text"
                name="description"
                variant="filled"
                onChange={handleChanged}
                value={description}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Genero"
                fullWidth
                type="text"
                multiline
                name="genre"
                onChange={handleChanged}
                value={genre}
              />
              <TextField
                name="cover"
                type="file"
                onChange={handleFileChanged}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Plataforma"
                fullWidth
                type="text"
                name="platform"
                multiline
                onChange={handleChanged}
                value={platform}
              />
              <Button variant="contained" color="success" disabled={btnDisabled} type="submit">
                {buttonInfo}
              </Button>
            </FormCard>
          </CardContent>
        </Card>
      </form>
    </AddContainer>
  );
}
