import './style.css'
import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { FiMoreVertical } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md";

function Card({ title, paragraph, id, onSelect }) {
  const TextCleaner = (e) => {
    const cleanedText = e.replace(/[.,!?;:()]/g, '');
    const wordcount = cleanedText.trim().split(" ")
    return wordcount
  }


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
        <h1>{title}</h1>
        <p>{TextCleaner(paragraph).length > 50 ? <>{TextCleaner(paragraph).slice(0, 60).join(" ")}...<span className='more'>More</span></> : paragraph}</p>
      </Link>

      <Space className='select' direction="vertical" onChange={handleChange}>
        <Space wrap>
          <Dropdown 
            menu={{items,
              onClick: ({ key }) => {
                if (typeof onSelect === 'function') {
                  onSelect(id, key); // id va tanlangan key ni yuboramiz
                }
              },
            }}
            placement="bottom">
            <Button
              style={{
                height: 150,
                width: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
              type="text">
              <FiMoreVertical size={24} />
            </Button>
          </Dropdown>
        </Space>
      </Space>
    </div>
  )
}


export default Card;