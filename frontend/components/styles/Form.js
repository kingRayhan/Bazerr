import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`

const Form = styled.form`
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
    background: rgba(0, 0, 0, 0.02);
    border: 5px solid white;
    padding: 20px;
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 600;
    label {
        display: block;
        margin-bottom: 2rem;
    }
    input,
    textarea,
    select {
        width: 100%;
        padding: 0.5rem;
        /* font-size: 1rem; */
        font-size: 18px;
        border: 1px solid black;
        &:focus {
            outline: 0;
            border-color: ${props => props.theme.primary};
        }
    }
    button,
    input[type='submit'] {
        width: auto;
        background: ${tp => tp.theme.primary};
        color: white;
        border: 0;
        font-size: 2rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
    }
    fieldset {
        border: 0;
        padding: 0;

        &[disabled] {
            opacity: 0.5;
        }
        &::before {
            height: 15px;
            content: '';
            display: block;
            margin-bottom: 25px;
            background-image: linear-gradient(
                to right,
                #ff3019 0%,
                #e2b04a 50%,
                #ff3019 100%
            );
        }
        &[aria-busy='true']::before {
            background-size: 50% auto;
            animation: ${loading} 0.5s linear infinite;
        }
    }
`

export default Form
