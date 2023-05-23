import styled from 'styled-components/macro'


export const Block = styled.div`
  display: flex;

  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  margin: 40px 0 0;
  padding: 20px 0 28px;
  max-width: 450px;
  padding: 60px 68px 40px;
`

export const Blocked = styled.div`
  display: flex;

  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 60px 68px 40px;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* this is how you pass a property to a styled component 
       - then look in index.js of this component for calling method
       - here, you can make the flex from left or right based on how you call it */

  max-width: 1100px;
  margin: auto;
  width: 100%;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

export const Error = styled.div`
  background: #e87c03;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 0 16px;
  color: #1c1e21;
  padding: 15px 20px;
`

export const Base = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
`

export const Title = styled.h1`
  color: #ff9800;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 28px;
`

export const Text = styled.p`
  color: #1c1e21;
  font-size: 16px;
  font-weight: 500;
`

export const TextSmall = styled.p`
  margin-top: 10px;
  color: #1c1e21;
  font-size: 13px;
  line-height: normal;
`
export const Link = styled.p`
  color: #ff9800;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export const Input = styled.input`
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #dddfe2;
  color: #1c1e21;
  height: 50px;
  line-height: 50px;
  padding: 5px 20px;
  margin-bottom: 20px;
  &:last-of-type {
    margin-bottom: 30px;
  }
`

export const Submit = styled.button`
  background:#ff9800;
  border-radius: 4px;
  margin:24px 0 12px;
  border: 0;
  color: white;
  cursor:pointer;
  padding: 16px;
  font-weight:bold;
  
  &:disabled{
   opacity:0.5;
  }
  }
`

export const Pane = styled.div`
  width: 50%;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 45px;
    text-align: center;
  }
`
export const Panel = styled.div`
  width: 70%;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 45px;
    text-align: center;
  }
`
