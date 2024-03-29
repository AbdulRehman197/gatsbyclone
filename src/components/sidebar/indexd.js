import React from "react";
import Tree from "./tree";
import { StaticQuery, graphql } from "gatsby";
import styled from "react-emotion";
import { ExternalLink } from "react-feather";
import "../styles.css";
import config from "../../../config";

const forcedNavOrder = config.sidebar.forcedNavOrder;

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({ className, active, level, ...props }) => {
  return (
    <li className={className}>
      <a href={props.to} {...props} />
    </li>
  );
})`
  list-style: none;

  a {
    color: #5c6975;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      color: rgb(116, 76, 188) !important;
    }

    ${props =>
      props.active &&
      `
      color: #663399;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #000;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`;


const DarkSidebar = styled("aside")`
  width: 100%;
  background-color: #000 !important;
  border-right: 1px solid #ede7f3;
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 0px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0;
  background-color: #000 !important;

  @media only screen and (max-width: 767px) {
    padding-left: 0px;
    background-color: #131217;
    background: #131217;
  }
  @media (min-width: 767px) and (max-width: 1023px) {
    padding-left: 0;
  }
  @media only screen and (max-width: 1023px) {
    width: 100%;
    /* position: relative; */
    height: 40vh;
  }
`;

const Divider = styled(props => <li {...props}></li>)`
  list-style: none;
  padding: 0.5rem 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`;

var darkmood = window.localStorage.getItem("darkmood");
const SidebarLayout = ({ location,dark }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      return (
        <div>
          (
            <DarkSidebar>
              <ul className={"sideBarUL"}>
                <Tree edges={allMdx.edges} />
                <Divider />
                {config.sidebar.links.map((link, key) => {
                  if (link.link !== "" && link.text !== "") {
                    return (
                      <ListItem key={key} to={link.link}>
                        {link.text}
                        <ExternalLink size={14} />
                      </ListItem>
                    );
                  }
                })}
              </ul>
            </DarkSidebar>
          )}
        </div>
      );
    }}
  />
);

export default SidebarLayout;
