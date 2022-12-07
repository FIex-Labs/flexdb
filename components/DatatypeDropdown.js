import React from "react";

const SQLDataTypes = () => {
  return (
    <select>
      <option value="bigint">BIGINT</option>
      <option value="binary">BINARY</option>
      <option value="bit">BIT</option>
      <option value="char">CHAR</option>
      <option value="date">DATE</option>
      <option value="datetime">DATETIME</option>
      <option value="decimal">DECIMAL</option>
      <option value="double">DOUBLE</option>
      <option value="enum">ENUM</option>
      <option value="float">FLOAT</option>
      <option value="int">INT</option>
      <option value="longblob">LONGBLOB</option>
      <option value="longtext">LONGTEXT</option>
      <option value="mediumblob">MEDIUMBLOB</option>
      <option value="mediumint">MEDIUMINT</option>
      <option value="mediumtext">MEDIUMTEXT</option>
      <option value="set">SET</option>
      <option value="smallint">SMALLINT</option>
      <option value="text">TEXT</option>
      <option value="time">TIME</option>
      <option value="timestamp">TIMESTAMP</option>
      <option value="tinyblob">TINYBLOB</option>
      <option value="tinyint">TINYINT</option>
      <option value="tinytext">TINYTEXT</option>
      <option value="varbinary">VARBINARY</option>
      <option value="varchar">VARCHAR</option>
      <option value="year">YEAR</option>
    </select>
  );
};

export default SQLDataTypes;