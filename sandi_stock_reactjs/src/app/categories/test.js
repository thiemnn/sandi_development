import React from 'react';
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { animated, useSpring } from '@react-spring/web';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
});

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
    const [expanded, setExpanded] = React.useState(['1', '3', '7']);
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
            </StyledTreeItem>
        </TreeView>
    );
}