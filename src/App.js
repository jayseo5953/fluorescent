import React, { useState } from "react";
import styled from "styled-components";
import redShoesImg from "./assets/product_red.png";
import greenShoesImg from "./assets/product_green.png";
import greyShoesImg from "./assets/product_grey.png";

const productDetails = {
  name: "Red Flynknit Trainers",
  price: "$190.00",
  sizeOptions: [
    {
      id: "sm",
      label: "Small",
    },
    {
      id: "md",
      label: "Medium",
    },
    {
      id: "lg",
      label: "Large",
    },
    {
      id: "xl",
      label: "Extra Large",
    },
  ],
  colorOptions: [
    {
      id: "red",
      iconColorGradients: ["#ff0000", "#c40606"],
      name: "Red Shoes",
      imgSrc: redShoesImg,
    },
    {
      id: "green",
      iconColorGradients: ["#2cd36e", "#36956b"],
      name: "Green Shoes",
      imgSrc: greenShoesImg,
    },
    {
      id: "grey",
      iconColorGradients: ["#999999", "#787878"],
      name: "Grey Shoes",
      imgSrc: greyShoesImg,
    },
  ],
};
const OptionDetailsContainerWidth = "30vw";

const AddToCardButton = styled.div`
  border: 1px rgba(0, 0, 0, 0.1) solid;
  border-radius: 20px;
  color: rgba(0, 0, 0, ${({ disabled }) => (disabled ? 0.5 : 1)});
  padding: 0.75rem;
  margin: 1rem auto;
  width: 80%;
  text-align: center;
  &:hover {
    border: ${({ disabled }) => !disabled && "1px rgba(0, 0, 0, 1) solid"};
    cursor: ${({ disabled }) => !disabled && "pointer"};
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: calc(${OptionDetailsContainerWidth} + 3rem);
`;

const CircleButton = styled.div.attrs({ className: "magnify-button" })`
  align-items: center;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.31);
  display: flex;
  opacity: 0;
  height: 2.5rem;
  justify-content: center;
  width: 2.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  transition: opacity 0.2s;
  &:hover {
    cursor: pointer;
  }
`;

const ColorSelectSection = styled.div``;

const ColorSelectButton = styled.div`
  background: ${({ colorGradients }) =>
    colorGradients &&
    `linear-gradient(-45deg, ${colorGradients[0]} 50%, ${colorGradients[1]} 50%)`};
  border-radius: 50%;
  height: 1.1rem;
  width: 1.1rem;
`;

const ColorSelectButtonWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, ${({ selected }) => (selected ? 1 : 0.1)});
  border-radius: 50%;
  padding: 0.2rem;
  margin-left: 0.25rem;
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Divider = styled.hr`
  background: rgba(8, 40, 80, 0.2);
  border: none;
  height: 1px;
  margin: 1.5rem 0;
`;

const MaterialIcons = styled.span.attrs({
  className: "material-icons",
})``;

const OptionDetailsContainer = styled.div`
  position: fixed;
  right: 0;
  width: ${OptionDetailsContainerWidth};
  padding-right: 1rem;
`;

const ProductImg = styled.img.attrs(({ src, alt }) => ({ src, alt }))`
  height: 100%;
  width: 100%;
`;

const ProductImgContainer = styled.div`
  border: ${({ selected }) => selected && `1px solid green`};
  position: relative;
  margin: 1rem;
  &:hover {
    && .magnify-button {
      opacity: 1;
    }
  }
`;

const ProductOptionLabel = styled.p`
  font-weight: bold;
`;

const ProductPrice = styled.p`
  color: rgba(0, 0, 0, 0.75);
`;

const OptionList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SizeSelectButton = styled.div`
  background-color: ${({ selected }) => (selected ? "black" : "#e3e0e0")};
  border: ${({ selected }) => (selected ? "1px solid black" : "none")};
  border-radius: 20px;
  color: ${({ selected }) => (selected ? "white" : "black")};
  font-size: 0.95rem;
  padding: 0.7rem 1rem;
  margin-left: 0.5rem;
  white-space: nowrap;
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

const ProductListContainer = styled.div`
  width: 50vw;
`;
const SizeSelectSection = styled.div``;

const MagnifyButton = () => {
  return (
    <CircleButton>
      <MaterialIcons>zoom_in</MaterialIcons>
    </CircleButton>
  );
};

const Product = ({ data, selectedColor }) => {
  const { name, imgSrc } = data;
  return (
    <ProductImgContainer id={data.id} selected={data.id === selectedColor}>
      <ProductImg src={imgSrc} alt={name} />
      <MagnifyButton></MagnifyButton>
    </ProductImgContainer>
  );
};

const SizeListSelect = ({ options, selectedSize, setSelectedSize }) => {
  const handleClick = (productId) => {
    if (productId === selectedSize) {
      setSelectedSize(null);
      return;
    }
    setSelectedSize(productId);
  };

  return (
    <OptionList>
      {options.map((option) => (
        <SizeSelectButton
          selected={selectedSize === option.id}
          onClick={() => handleClick(option.id)}
        >
          {option.label}
        </SizeSelectButton>
      ))}
    </OptionList>
  );
};

const ColorListSelect = ({ options, selectedColor, setSelectedColor }) => {
  const handleClick = (productId) => {
    if (productId === selectedColor) {
      setSelectedColor(null);
      return;
    }
    setSelectedColor(productId);
    const productElement = document.querySelector(`#${productId}`);
    productElement.scrollIntoView();
  };

  return (
    <OptionList>
      {options.map((option) => (
        <ColorSelectButtonWrapper
          selected={selectedColor === option.id}
          onClick={() => handleClick(option.id)}
        >
          <ColorSelectButton colorGradients={option.iconColorGradients}>
            {option.label}
          </ColorSelectButton>
        </ColorSelectButtonWrapper>
      ))}
    </OptionList>
  );
};

function App() {
  const { name, price, colorOptions, sizeOptions } = productDetails;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <Body>
      <ProductListContainer>
        {colorOptions.map((product) => (
          <Product data={product} selectedColor={selectedColor} />
        ))}
      </ProductListContainer>
      <OptionDetailsContainer>
        <h2>{name}</h2>
        <ProductPrice>{price}</ProductPrice>
        <br />
        <SizeSelectSection>
          <ProductOptionLabel>Size</ProductOptionLabel>
          <SizeListSelect
            options={sizeOptions}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          <Divider />
        </SizeSelectSection>
        <ColorSelectSection>
          <ProductOptionLabel>Colour</ProductOptionLabel>
          <ColorListSelect
            options={colorOptions}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </ColorSelectSection>
        <br />
        <AddToCardButton disabled={!selectedColor || !selectedSize}>
          Add to Cart
        </AddToCardButton>
      </OptionDetailsContainer>
    </Body>
  );
}

export default App;
