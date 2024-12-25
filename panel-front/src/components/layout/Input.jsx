import { IoSearchSharp } from "react-icons/io5";
import styled from "styled-components";

const Input = (props) => {
  const {
    type = "text",
    placeHolder = "",
    height = "100%",
    width = "100%",
    execute = () => {},
    value = "",
    onChange = (value) => {},
    autocomplete = "off",
    search = null,
  } = props;

  const handleChange = (e) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  return (
    <Container height={height} width={width}>
      <InputField
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeHolder}
        onClick={execute}
        autoComplete={autocomplete}
        $search={search ? "true" : "false"}
      />
      {search && <IoSearchSharp className="search" />}
    </Container>
  );
};

const Container = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  position: relative;

  .search {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: var(--light-gray-color);
  }
`;

const InputField = styled.input`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--purple-color);
  color: var(--secondary-color);
  padding: 0 15px;
  padding-left: ${(props) => (props.$search === "true" ? "40px" : "15px")};
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid var(--light-gray-color);
  font-size: 16px;

  &::placeholder {
    color: var(--light-gray-color);
  }

  &:focus {
    outline: 2px solid var(--main-color);
  }
`;

export default Input;
