import styled from '@emotion/styled';

export const Sidebar = styled.div`
    color: #adadad;
    height: 100%;
    width: ${props => props.style?.width};
    min-width: ${props => props.style?.width};
    text-align: left;
    transition: width, left, right, 0.3s;
    position: relative;
    z-index: 1009;    
`;

export const SidebarInner = styled.div`
    background: #1d1d1d;
    height: 100%;
    position: relative;
    z-index: 101;
`;

export const SidebarLayout = styled.div`
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 101;
`;  

export const Header = styled.div`
    border-bottom: 1px solid;    
`;

export const Content = styled.div`
    flex-grow: 1;
`;

export const Footer = styled.div`
    border-top: 1px solid;    
`;

export const ContentList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;


// .pro-sidebar {
//     color: $sidebar-color;
//     height: 100%;
//     width: $sidebar-width;
//     min-width: $sidebar-width;
//     text-align: left;
//     transition: width, left, right, 0.3s;
//     position: relative;
//     z-index: 1009;
//     > .pro-sidebar-inner {
//       background: $sidebar-bg-color;
//       height: 100%;
//       position: relative;
//       z-index: 101;
  
//       > img.sidebar-bg {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         object-position: center;
//         position: absolute;
//         opacity: 0.3;
//         left: 0;
//         top: 0;
//         z-index: 100;
//       }
  
//       > .pro-sidebar-layout {
//         height: 100%;
//         overflow-y: auto;
//         overflow-x: hidden;
//         position: relative;
//         display: flex;
//         flex-direction: column;
//         z-index: 101;
  
//         .pro-sidebar-header {
//           border-bottom: 1px solid rgba($sidebar-color, 0.2);
//         }
//         .pro-sidebar-content {
//           flex-grow: 1;
//         }
//         .pro-sidebar-footer {
//           border-top: 1px solid rgba($sidebar-color, 0.2);
//         }
//         ul {
//           list-style-type: none;
//           padding: 0;
//           margin: 0;
//         }
//       }
//     }
  
//     .overlay {
//       position: fixed;
//       top: 0;
//       right: 0;
//       bottom: 0;
//       left: 0;
//       background-color: rgba(#000, 0.3);
//       z-index: 100;
//       display: none;
//     }
  
//     &.collapsed {
//       width: $sidebar-collapsed-width;
//       min-width: $sidebar-collapsed-width;
//     }
  
//     &.rtl {
//       text-align: right;
//       direction: rtl;
//     }
  
//     &.xs {
//       @media (max-width: $breakpoint-xs) {
//         @include break-point;
//       }
//     }
//     &.sm {
//       @media (max-width: $breakpoint-sm) {
//         @include break-point;
//       }
//     }
//     &.md {
//       @media (max-width: $breakpoint-md) {
//         @include break-point;
//       }
//     }
//     &.lg {
//       @media (max-width: $breakpoint-lg) {
//         @include break-point;
//       }
//     }
//     &.xl {
//       @media (max-width: $breakpoint-xl) {
//         @include break-point;
//       }
//     }
//   }