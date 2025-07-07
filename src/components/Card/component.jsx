import './style.css'
import React, { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { FiMoreVertical } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md"
import { FaHeart } from "react-icons/fa6";;

export const TextCleaner = (e) => {
  const cleanedText = e.replace(/[.,!?;:()]/g, '');
  const wordcount = cleanedText.trim().split(" ")
  return wordcount
}


function Card({ title, paragraph, id, author, onSelect, date, likes }) {
  const LocalUser = localStorage.getItem('username')
  const user = author === LocalUser

  const items = [
    {
      key: 'edit',
      label: (<MdEdit/>),
    },
    {
      key: 'delete',
      label: (<MdDelete/>),
    }
  ];


  const handleChange = (e) => {
    if (typeof onSelect === 'function') {
      onSelect(e.target.value);
    }
  };
  
  return (
    <div className='card-wrapper flex'>
      <Link to={`/article/${id}`} className="card">
        <p className='details'><em className='author'>@{author}</em> - <span>{date}</span></p>
        <h1>{title}</h1>
        <p>{TextCleaner(paragraph).length > 30 ? <>{TextCleaner(paragraph).slice(0, 30).join(" ")}...<span className='more'>More</span></> : paragraph}</p>
        <div className="popular flex"><FaHeart className='icon'/>{likes}</div>
      </Link>

        {(user || LocalUser === 'king') && (
  <Space className='select' direction="vertical" onChange={handleChange}>
    <Space wrap>
      <Dropdown 
        menu={{
          items,
          onClick: ({ key }) => {
            if (typeof onSelect === 'function') {
              onSelect(id, key); // id va tanlangan key ni yuboramiz
            }
          },
        }}
        placement="bottom">
        <Button
          style={{
            height: 170,
            width: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
          className='button'
          type="text">
          <FiMoreVertical size={24} />
        </Button>
      </Dropdown>
    </Space>
  </Space>
)}
    </div>
  )
}


export default Card;