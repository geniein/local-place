import styled from '@emotion/styled';

export const StyledMenuItem = styled.li`
    font-size: 15px;    
`;

export const InnerItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 8px 35px 8px 20px;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: black;
      }    
`;

export const IconWrapper = styled.span`
    margin-right: 10px;
    font-size: 14px;
    width: $icon-size;
    min-width: $icon-size;
    height: $icon-size;
    line-height: $icon-size;
    text-align: center;
    display: inline-block;
    border-radius:50%;
`;

export const Icon = styled.span`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const ItemContent = styled.span`
    flex-grow: 1;
    flex-shrink: 1;
`;

export const SuffixWrapper = styled.span`
    opacity: 1;
    transition: opacity 0.2s;
`;

export const PrefixWrapper = styled.span`
    display: flex;
    margin-right: 5px;
    opacity: 1;
    transition: opacity 0.2s;
`;