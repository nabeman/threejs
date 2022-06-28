window.addEventListener("DOMContentLoaded",init);

function init(){
    const container = document.querySelector("#canvas");
    container.addEventListener('click',handleClick);
    const mouse = new THREE.Vector2();
    const obj_array = [];
    const return_x = [];
    const return_array = [];
    const confirm = [];
    let raycaster = new THREE.Raycaster();
    let click = false;

    //レンダラーを作成
    const renderer = new THREE.WebGLRenderer({canvas:container});

    //シーンを作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2F3137);
    scene.fog = new THREE.Fog(0x000000, 10, 60);

    //カメラを作成
    const camera = new THREE.OrthographicCamera(-50, +50, 25, -25, 1, 100);
    camera.position.set(0,0,10);

    const BoxMesh1 = box();
    const BoxMesh2 = box();
    const BoxMesh3 = box();
    const BoxMesh4 = box();
    scene.add(BoxMesh1,BoxMesh2,BoxMesh3,BoxMesh4);
    
    BoxMesh1.position.set(-33,0,0);
    BoxMesh2.position.set(-11,0,0);
    BoxMesh3.position.set(11,0,0);
    BoxMesh4.position.set(33,0,0);
        
    function handleClick(event){         
        click = true;  
        const element = event.currentTarget;
        const x = event.clientX - element.offsetLeft;
        const y = event.clientY - element.offsetTop;
        const w = element.offsetWidth;
        const h = element.offsetHeight;
        mouse.x = (x/w)*2-1;
        mouse.y = -(y/h)*2+1;
        raycaster.setFromCamera(mouse,camera);
        const intersects = raycaster.intersectObjects(scene.children,false);
        if(intersects.length > 0){
            if(obj_array.length == 0){
                obj_array[0] = intersects[0].object;    
                return_x[0] = obj_array[0].position.x;
            }else{
                return_array[[0]] = obj_array[0];
                return_array[[1]] = return_x[0];
                obj_array[0] = intersects[0].object;
                return_x[0] = obj_array[0].position.x;
            }
        }
    }
       
    tick();

    function tick(){
        if(obj_array.length > 0){
            // obj_array.forEach((val) => {
            //     val.position.x += (-40 - val.position.x) * 0.015;
            //     val.position.z += (40 - val.position.z) * 0.02;
            // })
            //confirm[0] = obj_array.position.x;
            obj_array[0].position.x += (-40 - obj_array[0].position.x) * 0.015;
            obj_array[0].position.z += (40 - obj_array[0].position.z) * 0.02;
            camera.position.z += (50 - camera.position.z)* 0.02;
        }
        if(return_array.length > 0){
            return_array[0].position.x += (return_array[[1]] - return_array[0].position.x) * 0.015;
            return_array[0].position.z += (0 - return_array[0].position.z) * 0.02;
        }
        renderer.render(scene,camera);
        requestAnimationFrame(tick);
    }

    onResize();
    window.addEventListener("Resize",onResize);

    function onResize(){
        const width = document.getElementById('canvas').clientWidth;
        const height = document.getElementById('canvas').clientHeight;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        const aspect = width/height;
        camera.left = camera.bottom*aspect;
        camera.right = camera.top*aspect;
        camera.updateProjectionMatrix();
    }
}

function box(){
    const geometry = new THREE.BoxGeometry(10,10,10);
    const material = new THREE.MeshBasicMaterial({color:0x6BAFD6});
    const mesh = new THREE.Mesh(geometry,material);

    return mesh;
}
