import React from "react";
import ReactTagInput from "react-tag-input";
 
export const Tag = () => {
    const [tags, setTags] = React.useState(["タグ1"])
    return (
        <ReactTagInput
            placeholder="入力してください"
            tags={tags} 
            onChange={(newTags) => setTags(newTags)}
        />
    )
}
  
export default Tag