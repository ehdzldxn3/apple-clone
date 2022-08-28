document.addEventListener("DOMContentLoaded", () => {

    let scrollY = 0; //Y축 값
    let prevScrollHeight = 0; //현재 스크롤 위치보다 이전에 위치한 스크롤 높이 값의 합
    let currentScene = 0; //현재 활성화 된 섹션

    const sceneInfo = [
        {
            //section 0
            type: 'sticky',
            heightNum: 5,   //브라우저의 높이의 5배로 scrollHeight 셋팅
            scrollHeight: 0,
            objs: {
                container : document.getElementById('scroll_section_0')
            }
        },
        {
            //section 1
            type: 'normal',
            heightNum: 5,   //브라우저의 높이의 5배로 scrollHeight 셋팅
            scrollHeight: 0,
            objs: {
                container : document.getElementById('scroll_section_1')
            }
        },
        {
            //section 2
            type: 'sticky',
            heightNum: 5,   //브라우저의 높이의 5배로 scrollHeight 셋팅
            scrollHeight: 0,
            objs: {
                container : document.getElementById('scroll_section_2')
            }
        },
        {
            //section 3
            type: 'sticky',
            heightNum: 5,   //브라우저의 높이의 5배로 scrollHeight 셋팅
            scrollHeight: 0,
            objs: {
                container : document.getElementById('scroll_section_3')
            }

        },
    ]

    //섹션의 스크롤 높이 셋팅
    const setLayout = () => {
        
        for(item of sceneInfo) {
            item.scrollHeight = item.heightNum * window.innerHeight
            item.objs.container.style.height = `${item.scrollHeight}px`
        }

        let totalScrollHeight = 0;
        scrollY = window.scrollY
        for(let i=0; i<sceneInfo.length; i++ ) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= scrollY) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show_scene_${currentScene}`)
    }

    


    
    const scrollLoop = () => {
        prevScrollHeight = 0;

        for(let i=0; i<currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight
        }
        
        if(scrollY > (prevScrollHeight+sceneInfo[currentScene].scrollHeight)) {
            currentScene++;
            document.body.setAttribute('id', `show_scene_${currentScene}`)
        } 

        if(scrollY < prevScrollHeight) {
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show_scene_${currentScene}`)
        }
        
        
    }


    //창이 바뀌면 높이를 다시 계산
    
    window.addEventListener('scroll', ()=> {
        scrollY = window.scrollY
        scrollLoop()
    })
    
    window.addEventListener('resize', setLayout)
    window.addEventListener('load', setLayout)
    


});
