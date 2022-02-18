import styled from "styled-components";

export const Container = styled.SafeAreaView`
    background-color: #141a29;
    flex: 1;
`;

export const Header = styled.View`
    z-index: 99;
    position: absolute;
    top: 35px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 16px;
`;

export const HeaderButon = styled.TouchableOpacity`
    width: 46px;
    height: 46px;
    background-color: rgba(25,26,48,0.8);
    border-radius: 25px;
    justify-content: center;
    align-items: center;
`;

export const Banner = styled.Image`
    width: 100%;
    height: 300px;
    border-bottom-left-radius:30px;
    border-bottom-right-radius: 30px;
`;

export const ButtonLink = styled.TouchableOpacity`
    background-color: #E72f49;
    width: 63px;
    height: 63px;
    border-radius:35px;
    position: absolute;
    top:300px;
    right:15px;
    justify-content: center;
    align-items: center;
    z-index: 99;
`;

export const Title = styled.Text`
    color: white;
    font-size: 25px;
    font-weight: bold;
    padding: 18px 14px;
    margin-top: 8px;
`;

export const ContentArea = styled.View`
   flex-direction: row;
   align-items: center;
   padding: 0 14px;
   justify-content: space-between;
`;

export const Rate = styled.Text`
   font-size: 18px;
   font-weight: bold;
   color: white;
`;

export const ListGeners = styled.FlatList`
   padding-left: 14px;
   margin: 8px 0;
   max-height: 35px;
   min-height: 35px;
`;

export const Description = styled.Text`
   color: white;
   padding-left: 14px;
   padding-right: 14px;
   padding-bottom: 30px;
   line-height: 20px;
`;

