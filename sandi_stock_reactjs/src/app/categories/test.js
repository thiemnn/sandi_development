import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { animated, useSpring } from '@react-spring/web';
import CropSquareSharpIcon from '@material-ui/icons/CropSquareSharp';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import CropSquareOutlinedIcon from '@material-ui/icons/CropSquareOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

const useStyles = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
});

function MinusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props) {
    return (
        <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}           
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

function TransitionComponent(props) {
    const style = useSpring({
        from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
        to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

const StyledTreeItem = withStyles((theme) => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3,
        },
    },
    group: {
        marginLeft: 7,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);



export default function CustomizedTreeView() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(['1','3','7']);
    const handleToggle = (event, nodeIds) => {
      if (event.target.closest('.MuiTreeItem-iconContainer')) {
        setExpanded(nodeIds);
      }
      console.log(nodeIds)
    };
    const handleSelect = (event, nodeIds) => {
        console.log(nodeIds)
      };
    return (
        <TreeView onNodeToggle={handleToggle} onNodeSelect={handleSelect} expanded={expanded}
            className={classes.root}
            defaultExpanded={['1']}
            defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
            defaultExpandIcon={<AddBoxOutlinedIcon />}
            defaultEndIcon={<CheckBoxOutlineBlankOutlinedIcon />}
        >
            <StyledTreeItem nodeId="1" label="Băng tải">
                <StyledTreeItem nodeId="2" label="PVC" />
                <StyledTreeItem nodeId="3" label="PU">
                    <StyledTreeItem nodeId="6" label="Màu xanh" />
                    <StyledTreeItem nodeId="7" label="Màu xám">
                        <StyledTreeItem nodeId="9" label="Dày 1mm" />
                        <StyledTreeItem nodeId="10" label="Dày 2mm" />
                        <StyledTreeItem nodeId="11" label="Dày 3mm" />
                    </StyledTreeItem>
                    <StyledTreeItem nodeId="8" label="Màu hồng" />
                </StyledTreeItem>
                <StyledTreeItem nodeId="4" label="Xích" />
                <StyledTreeItem nodeId="5" label="Gỗ" />
            </StyledTreeItem>
        </TreeView>
    );
}