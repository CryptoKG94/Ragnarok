import Backdrop from '@mui/material/Backdrop';
import styled from 'styled-components'
import ReactLoading from "react-loading";


const LoadingDiv = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

const Prop = styled('h3')`f5 f4-ns mb0 white`;

const Loading = (props) => {
    const { open } = props
    return (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={ open }
        >
          <LoadingDiv>
            <ReactLoading type={'spinningBubbles'} color="#fff" />
            <Prop> Loading... </Prop>
          </LoadingDiv>
        </Backdrop>
    )
}

export default Loading;