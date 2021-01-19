import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth, useFirebaseStorage } from '../../firebase';
import { ArrowRight } from 'react-feather';

// $purple500: #7f47dd;

const Wrapper = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 2.88rem;
  z-index: 99;
  background-color: black;

  a {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    width: 100%;

    p {
      margin: 15px;
    }

    img {
      width: 50px;     
      height: 50px;    
      object-fit: cover; 
    }

  }

  &:hover {
    a {
      color: #7f47dd;
    }
  }
`

export default function Fab({ href, label, box }) {

  const { noUserFound, user } = useAuth();

  const { getDownloadURL, state: { data } } = useFirebaseStorage();

  useEffect(() => {
    getDownloadURL(user.avatar)
  }, []);

  return (
    <Wrapper className="box--a">
      { console.log(data) }
      <Link to={href}>
        <p>{ user.firstName ? user.firstName : label }</p>
        { user.avatar ? <img className="box--l" src={data} /> : <ArrowRight className="box--l"/> }
      </Link>
    </Wrapper>
  )
}