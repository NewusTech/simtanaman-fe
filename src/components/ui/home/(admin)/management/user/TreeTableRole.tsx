"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const data: {
  id: number;
  name: string;
  checked: boolean;
  children: { id: number; name: string; checked: boolean; children: any[] }[];
}[] = [
  {
    id: 1,
    name: "Lorem Ipsum",
    checked: true,
    children: [],
  },
  {
    id: 2,
    name: "Lorem Ipsum",
    checked: false,
    children: [],
  },
  {
    id: 3,
    name: "Lorem Ipsum",
    checked: true,
    children: [
      {
        id: 4,
        name: "Lorem Ipsum",
        checked: true,
        children: [],
      },
      {
        id: 5,
        name: "Lorem Ipsum",
        checked: false,
        children: [],
      },
      {
        id: 6,
        name: "Lorem Ipsum",
        checked: true,
        children: [],
      },
    ],
  },
  {
    id: 7,
    name: "Lorem Ipsum",
    checked: false,
    children: [],
  },
  {
    id: 8,
    name: "Lorem Ipsum",
    checked: false,
    children: [],
  },
];

/**
 * TreeTableRole component renders a hierarchical tree table with checkboxes.
 *
 * @component
 *
 * @example
 * return (
 *   <TreeTableRole />
 * )
 *
 * @returns {JSX.Element} The rendered TreeTableRole component.
 *
 * @description
 * This component displays a tree table structure with checkboxes for each item.
 * The data is managed using a state hook, and the checkboxes can be toggled.
 *
 * @typedef {Object} TreeNode
 * @property {number} id - The unique identifier for the node.
 * @property {string} name - The name of the node.
 * @property {boolean} checked - The checked state of the node.
 * @property {TreeNode[]} children - The child nodes of the current node.
 *
 * @typedef {Object} TreeData
 * @property {TreeNode[]} data - The array of tree nodes.
 *
 * @param {TreeData} props - The props for the component.
 *
 * @function handleCheck
 * @description Toggles the checked state of a node and its children.
 * @param {number} id - The unique identifier of the node to be toggled.
 *
 * @function renderRows
 * @description Recursively renders the rows of the tree table.
 * @param {TreeNode[]} items - The array of tree nodes to be rendered.
 * @param {number} [level=0] - The current level of the tree (used for indentation).
 * @returns {JSX.Element[]} The rendered rows of the tree table.
 */
const TreeTableRole = () => {
  const [treeData, setTreeData] = useState(data);

  const handleCheck = (id: number) => {
    const updateChecked = (
      items: {
        id: number;
        name: string;
        checked: boolean;
        children: {
          id: number;
          name: string;
          checked: boolean;
          children: any[];
        }[];
      }[]
    ): {
      id: number;
      name: string;
      checked: boolean;
      children: {
        id: number;
        name: string;
        checked: boolean;
        children: any[];
      }[];
    }[] => {
      return items.map(
        (item: {
          id: number;
          name: string;
          checked: boolean;
          children: {
            id: number;
            name: string;
            checked: boolean;
            children: any[];
          }[];
        }) => {
          if (item.id === id) {
            return { ...item, checked: !item.checked };
          }
          if (item.children) {
            return { ...item, children: updateChecked(item.children) };
          }
          return item;
        }
      );
    };
    setTreeData(updateChecked(treeData));
  };

  const renderRows = (
    items: { id: number; name: string; checked: boolean; children: any[] }[],
    level = 0
  ) => {
    return items.map((item) => (
      <div key={item.id} className="flex items-center gap-2 p-2 border-b px-3">
        <Checkbox
          checked={item.checked}
          onCheckedChange={() => handleCheck(item.id)}
        />
        <span className="text-nowrap text-sm">{item.name}</span>
        {item.children &&
          item.children.length > 0 &&
          renderRows(item.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="border rounded-md  mx-auto bg-white w-auto">
      <div className="bg-primary-100 p-2 font-medium text-center text-sm text-primary-500">
        Daftar Hak Akses
      </div>
      <div className="w-auto">{renderRows(treeData)}</div>
    </div>
  );
};

export default TreeTableRole;
