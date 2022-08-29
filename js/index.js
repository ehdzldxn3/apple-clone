document.addEventListener("DOMContentLoaded", () => {

    let scrollY = 0; //Y축 값
    let prevScrollHeight = 0; //현재 스크롤 위치보다 이전에 위치한 스크롤 높이 값의 합
    let currentScene = 0; //현재 활성화 된 섹션
    let enterNewScene = false;  //새로운 섹션이 들어오면 true

    const sceneInfo = [
        {
            //section 0
            type: 'sticky',
            heightNum: 5,   //브라우저의 높이의 5배로 scrollHeight 셋팅
            scrollHeight: 0,
            objs: {
                container : document.getElementById('scroll_section_0'),
                msg1 : document.getElementById('section_0_1'),
                msg2 : document.getElementById('section_0_2'),
                msg3 : document.getElementById('section_0_3'),
                msg4 : document.getElementById('section_0_4'),
            },
            values : {
                msg1_opacity_in : [0, 1, {start: 0.1, end: 0.2}],
                msg1_opacity_out : [1, 0, {start: 0.25, end: 0.3}],
                msg1_translateY_in : [20, 0, {start: 0.1, end:0.2}],
                msg1_translateY_out : [0, -20, {start: 0.25, end: 0.3}],

                msg2_opacity_in : [0, 1, { start: 0.3, end: 0.4 }],
                msg2_opacity_out : [1, 0, { start: 0.45, end: 0.5 }],
				msg2_translateY_in : [20, 0, { start: 0.3, end: 0.4 }],
                msg2_translateY_out : [0, -20, { start: 0.45, end: 0.5 }],
				 
                msg3_opacity_in : [0, 1, { start: 0.5, end: 0.6 }],
                msg3_opacity_out : [1, 0, { start: 0.65, end: 0.7 }],
                msg3_translateY_in : [20, 0, { start: 0.5, end: 0.6 }],
                msg3_translateY_out : [0, -20, { start: 0.65, end: 0.7 }],
				
				msg4_opacity_in : [0, 1, { start: 0.7, end: 0.8 }],
                msg4_opacity_out : [1, 0, { start: 0.85, end: 0.9 }],
				msg4_translateY_in : [20, 0, { start: 0.7, end: 0.8 }],
                msg4_translateY_out : [0, -20, { start: 0.85, end: 0.9 }],
            },

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
                container : document.getElementById('scroll_section_2'),
                msg1 : document.getElementById('section_2_1'),
                msg2 : document.getElementById('section_2_2'),
                msg3 : document.getElementById('section_2_3'),
                pin2 : document.getElementById('pin2'),
                pin3 : document.getElementById('pin3'),
            },
            values : {

                msg1_opacity_in : [0, 1, { start: 0.15, end: 0.2 }],
                msg1_opacity_out : [1, 0, { start: 0.3, end: 0.35 }],
                msg1_translateY_in : [20, 0, { start: 0.15, end: 0.2 }],
                msg1_translateY_out : [0, -20, { start: 0.3, end: 0.35 }],

                msg2_opacity_in : [0, 1, { start: 0.5, end: 0.55 }],
                msg2_opacity_out : [1, 0, { start: 0.58, end: 0.63 }],
                msg2_translateY_in : [30, 0, { start: 0.5, end: 0.55 }],
                msg2_translateY_out : [0, -20, { start: 0.58, end: 0.63 }],

                msg3_opacity_in : [0, 1, { start: 0.72, end: 0.77 }],
                msg3_opacity_out : [1, 0, { start: 0.85, end: 0.9 }],
                msg3_translateY_in : [30, 0, { start: 0.72, end: 0.77 }],
                msg3_translateY_out : [0, -20, { start: 0.85, end: 0.9 }],
                
                pin2_scaleY : [0.5, 1, { start: 0.5, end: 0.55 }],
                pin2_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                pin2_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				
				pin3_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
				pin3_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				pin3_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
            },
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
            
            if(item.type === 'sticky') {
                item.scrollHeight = item.heightNum * window.innerHeight
                
            } else if (item.type === 'normal') {
                item.scrollHeight = item.objs.container.offsetHeight
            }
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
        console.log('currentScene : ', currentScene)
        document.body.setAttribute('id', `show_scene_${currentScene}`)
    }

    
    const playAnimation = () => {

        const objs = sceneInfo[currentScene].objs
        const values = sceneInfo[currentScene].values
        const currentY = scrollY - prevScrollHeight
        //현재 씬의 스크롤 높이
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentY / scrollHeight

        
        switch(currentScene) {
            case 0:

                if(scrollRatio <= 0.22) {
                    //in
                    objs.msg1.style.opacity = calcValues(values.msg1_opacity_in, currentY)    ;
                    objs.msg1.style.transform = `translateY(${calcValues(values.msg1_translateY_in, currentY)}%)`
                } else {
                    //out
                    objs.msg1.style.opacity = calcValues(values.msg1_opacity_out, currentY);
                    objs.msg1.style.transform = `translateY(${calcValues(values.msg1_translateY_out, currentY)}%)`
                }
                
                if (scrollRatio <= 0.42) {
					// in
					objs.msg2.style.opacity = calcValues(values.msg2_opacity_in, currentY);
					objs.msg2.style.transform = `translate3d(0, ${calcValues(values.msg2_translateY_in, currentY)}%, 0)`;
				} else {
					// out
					objs.msg2.style.opacity = calcValues(values.msg2_opacity_out, currentY);
					objs.msg2.style.transform = `translate3d(0, ${calcValues(values.msg2_translateY_out, currentY)}%, 0)`;
				}

                if (scrollRatio <= 0.62) {
					// in
					objs.msg3.style.opacity = calcValues(values.msg3_opacity_in, currentY);
					objs.msg3.style.transform = `translate3d(0, ${calcValues(values.msg3_translateY_in, currentY)}%, 0)`;
				} else {
					// out
					objs.msg3.style.opacity = calcValues(values.msg3_opacity_out, currentY);
					objs.msg3.style.transform = `translate3d(0, ${calcValues(values.msg3_translateY_out, currentY)}%, 0)`;
				}

                if (scrollRatio <= 0.82) {
					// in
					objs.msg4.style.opacity = calcValues(values.msg4_opacity_in, currentY);
					objs.msg4.style.transform = `translate3d(0, ${calcValues(values.msg4_translateY_in, currentY)}%, 0)`;
				} else {
					// out
					objs.msg4.style.opacity = calcValues(values.msg4_opacity_out, currentY);
					objs.msg4.style.transform = `translate3d(0, ${calcValues(values.msg4_translateY_out, currentY)}%, 0)`;
				}
                break
  
            case 2:
                if (scrollRatio <= 0.25) {
                    // in
                    objs.msg1.style.opacity = calcValues(values.msg1_opacity_in, currentY);
                    objs.msg1.style.transform = `translate3d(0, ${calcValues(values.msg1_translateY_in, currentY)}%, 0)`;
                } else {
                    // out
                    objs.msg1.style.opacity = calcValues(values.msg1_opacity_out, currentY);
                    objs.msg1.style.transform = `translate3d(0, ${calcValues(values.msg1_translateY_out, currentY)}%, 0)`;
                }
    
                if (scrollRatio <= 0.57) {
                    // in
                    objs.msg2.style.transform = `translate3d(0, ${calcValues(values.msg2_translateY_in, currentY)}%, 0)`;
                    objs.msg2.style.opacity = calcValues(values.msg2_opacity_in, currentY);
                    objs.pin2.style.transform = `scaleY(${calcValues(values.pin2_scaleY, currentY)})`;
                } else {
                    // out
                    objs.msg2.style.transform = `translate3d(0, ${calcValues(values.msg2_translateY_out, currentY)}%, 0)`;
                    objs.msg2.style.opacity = calcValues(values.msg2_opacity_out, currentY);
                    objs.pin2.style.transform = `scaleY(${calcValues(values.pin2_scaleY, currentY)})`;
                }
    
                if (scrollRatio <= 0.83) {
                    // in
                    objs.msg3.style.transform = `translate3d(0, ${calcValues(values.msg3_translateY_in, currentY)}%, 0)`;
                    objs.msg3.style.opacity = calcValues(values.msg3_opacity_in, currentY);
                    objs.pin3.style.transform = `scaleY(${calcValues(values.pin3_scaleY, currentY)})`;
                } else {
                    // out
                    objs.msg3.style.transform = `translate3d(0, ${calcValues(values.msg3_translateY_out, currentY)}%, 0)`;
                    objs.msg3.style.opacity = calcValues(values.msg3_opacity_out, currentY);
                    objs.pin3.style.transform = `scaleY(${calcValues(values.pin3_scaleY, currentY)})`;
                }
    


                break
                
            case 3:
                break
        }
        
    }

    const calcValues = (values, currentY) => {

        let rv = 0;

        //현재 스크롤에서 스크롤된 비율 
        const scrollY = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentY / scrollY;
        
        if(values.length === 3) {
            //start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollY;
            const partScrollEnd = values[2].end * scrollY;
            const partScrollY = partScrollEnd - partScrollStart;

            if(currentY >= partScrollStart && currentY <= partScrollEnd) {
                rv = (currentY - partScrollStart) / partScrollY * (values[1] - values[0]) + values[0];
            } else if (currentY < partScrollStart) {
                rv = values[0];
            } else if (currentY > partScrollEnd) {
                rv = values[1];
            }

        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv
    }

    
    const scrollLoop = () => {
        enterNewScene = false;
        prevScrollHeight = 0;

        for(let i=0; i<currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight
        }
        
        if(scrollY > (prevScrollHeight+sceneInfo[currentScene].scrollHeight)) {
            enterNewScene = true
            currentScene++;
            document.body.setAttribute('id', `show_scene_${currentScene}`)
        } 

        if(scrollY < prevScrollHeight) {
            enterNewScene = true;
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show_scene_${currentScene}`);
        }
        
        if(enterNewScene) return;
        playAnimation();
    }


    //창이 바뀌면 높이를 다시 계산
    
    window.addEventListener('scroll', ()=> {
        scrollY = window.scrollY
        scrollLoop()
    })
    
    window.addEventListener('resize', setLayout)
    window.addEventListener('load', setLayout)
    


});
