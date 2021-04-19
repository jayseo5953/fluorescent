import React, { useState } from "react";
import styled from "styled-components";
import redShoesImg from "./assets/product_red.svg";
import greenShoesImg from "./assets/product_green.svg";
import greyShoesImg from "./assets/product_grey.svg";

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

const optionDetailsContainerWith = "30vw";
const normalFontSize = "14px";

const AddToCardButton = styled.div`
  border: 1px rgba(0, 0, 0, 0.1) solid;
  border-radius: 20px;
  color: #1d1d1d;
  font-size: ${normalFontSize};
  line-height: 24px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding: 12px;
  margin: 1rem 0;
  text-align: center;
  &:hover {
    border: ${({ disabled }) => !disabled && "1px #1d1d1d solid"};
    cursor: ${({ disabled }) => !disabled && "pointer"};
  }
`;

const Body = styled.div`
  background: #ffffff;
  display: flex;
  justify-content: flex-end;
  margin-right: calc(${optionDetailsContainerWith} + 3rem);
`;

const CircleButton = styled.div.attrs({
  className: "magnify-button",
})`
  align-items: center;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.31);
  display: flex;
  opacity: 0;
  height: 40px;
  justify-content: center;
  position: absolute;
  top: 1rem;
  right: 1rem;
  transition: opacity 0.2s;
  width: 40px;
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
  height: 22px;
  width: 22px;
`;

const ColorSelectButtonWrapper = styled.div`
  border: 1px solid ${({ selected }) => (selected ? "#1B1B1B" : "#DEDEDE")};
  border-radius: 50%;
  padding: 3px;
  margin-left: 0.25rem;
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Divider = styled.hr`
  background: #dfdfdf;
  border: none;
  box-sizing: content-box;
  height: 1px;
  margin: 1.5rem 0;
`;

const MaterialIcons = styled.span.attrs({
  className: "material-icons",
})``;

const OptionDetailsContainer = styled.div`
  position: fixed;
  right: 0;
  width: ${optionDetailsContainerWith};
  padding-right: 1rem;
  & * {
    font-family: "IBM Plex Sans", sans-serif;
  }
`;

const ProductImg = styled.img.attrs(({ src, alt }) => ({ src, alt }))`
  width: 100%;
`;

const ProductImgContainer = styled.div`
  border: ${({ selected }) => selected && `1px solid #0077C8`};
  position: relative;
  margin: 1rem;
  &:hover {
    && .magnify-button {
      opacity: 1;
    }
  }
`;

const ProductOptionLabel = styled.p`
  font-size: ${normalFontSize};
  font-weight: bold;
  line-height: 28px;
`;

const ProductPrice = styled.div`
  color: #1d1d1d;
  font-size: 14px;
  line-height: 24px;
  margin-top: 4px;
`;

const ProductTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin-top: 2rem;
`;

const OptionList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SizeSelectButton = styled.div`
  background-color: ${({ selected }) => (selected ? "#1D1D1D" : "#F1F1F1")};
  border-radius: 20px;
  color: ${({ selected }) => (selected ? "#FFFFFF" : "#000000")};
  font-size: 0.95rem;
  padding: 8px 16px;
  margin-left: 8px;
  white-space: nowrap;
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

const ProductListContainer = styled.div``;
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
        <ProductTitle>{name}</ProductTitle>
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
