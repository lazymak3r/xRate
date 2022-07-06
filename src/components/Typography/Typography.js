import React, {useMemo} from 'react';
import {Text} from 'react-native';

const Typography = ({sx, children}) => {
  const textStyles = useMemo(() => {
    const stylesArr = [];
    !!sx && stylesArr.push(sx);

    return stylesArr;
  }, [sx]);

  return <Text style={textStyles}>{children}</Text>;
};

export default Typography;

Typography.defaultProps = {
  size: 16,
  children: 'Please pass text!',
};
