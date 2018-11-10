import modulesNames from "@/router/modules";
import Utils from '@/utils'

const getMenuList = function(data) {
    let formatData = data && data.map((item) => {
        return {
            id: item.id,
            parentId: item.parentId,
            path: item.menuUrl || '',
            name: item.menuCode || '',
            component: modulesNames[item.component],
            iconClass: item.menuIconClas ? item.menuIconClas : "",
            meta: {
                requireAuth: item.ifRequLgon == 1,
                title: item.menuName,
                hidden: item.isHide == 1
            },
            menuOrder: item.menuOrder
        };
    });
    let attributes = {
        id: 'id',
        parentId: 'parentId',
    };
    let treeData = Utils.toTreeData(formatData, attributes);

    treeData.forEach(item => {
        item.path = `/${item.path}`;
        let children = item.children;
        //存在子菜单,父菜单重定向到子菜单
        if (children.length > 0) {
            item.redirect = children[0].path;
            for (let j = 0; j < children.length; j++) {
                children[j].path = `/${children[j].path}`;
                if (children[j].children.length > 0) {
                    if (children[j].path === '/xiaoxintong') {
                        children[j].children[0].redirect = '/xiaoxintong';
                    } else {
                        children[j].redirect = `${children[j].path}/${children[j].children[0].path}`;
                    }

                }
            }
        }
    });
    //.sort(Utils.compareObj('menuOrder'))
    return treeData;
};


export default getMenuList;
