// 回调函数
$(function() {
    // 绑定点击事件 
    $(".logo").on('click', function() {
        $(".begin").removeClass('show')
        $(".easy").addClass('show')
    });

    $(".easy").on('click', '.easy-one', function() {
        $(".easy").removeClass('show')
        $('.content').addClass('show')
        start(30, 50, 40000)
    });
    $(".easy").on('click', '.easy-two', function() {
        $(".easy").removeClass('show')
        $('.content').addClass('show')
        start(40, 30, 40000)
    });
    $(".easy").on('click', '.easy-three', function() {
        $(".easy").removeClass('show')
        $('.content').addClass('show')
        start(50, 10, 40000)
    });

    // 飞机大战事件
    function start(number, drshow, time) {
        // 出现敌人的数量
        var number = number;
        // 敌人出现的时间
        var drshow = drshow;
        var time = time;
        // 生成飞机和子弹事件
        // 得分
        var defeng = 0;

        var zd2 = null;
        var zd1 = null;

        // 生成飞机和子弹事件
        function cj() {
            var zjfj = $('<div class="mefj"><img src="./img/e.png"></div>');
            $('.content').append(zjfj);
            var zd = $(' <div class="zd zd1"><img src="./img/fire.png"></div>')
            $('.content').append(zd);
            zdshow1();
            var zd = $(' <div class="zd zd2"><img src="./img/fire.png"></div>')
            $('.content').append(zd);
            zdshow2();
            // 生成敌人
            var ii = 0
            for (var i = 1; i <= number; i++) {
                ii++
                var ycshow = Math.floor(Math.random() * time)
                diff(ii, ycshow)
            }
        }
        cj()

        // 子弹定时器
        // 子弹1---------------------------
        function zdshow1() {
            // 子弹底部一开始距离顶部距离
            var sum = 545;
            zd1 = setInterval(function() {
                if (sum <= 0) {
                    sum = 545
                }
                $(".zd1").offset({
                    top: sum
                })
                sum = sum - 5;
            }, 1)
        }
        // 子弹2---------------------------
        function zdshow2() {
            var sum = 545;
            zd2 = setInterval(function() {
                if (sum <= 0) {
                    sum = 545
                }
                $(".zd2").offset({
                    top: sum
                })
                sum = sum - 5;
            }, 3)
        }

        // 按下左右键盘事件
        // 获取 mefj 可移动的最大值和最小值
        var wrapperleft1 = $(".wrapper").offset().left - 5;
        var wrapperleft2 = $(".wrapper").offset().left + 700 - 45;
        $(window).keydown(function(e) {
            // 按下左右键移动 mefj （5的倍数）
            var left = Math.floor($(".mefj").offset().left / 5) * 5;
            if (e.keyCode == 37) {
                // 移动到一定位置时，不在移动
                if (left <= wrapperleft1) {
                    return left
                }
                // 飞机宽度为50,子弹宽度为4 ，所以子弹-10+25-2
                $(".zd").offset({
                    left: left + 13
                });
                // 每次点击让 飞机 移动10px
                $(".mefj").offset({
                    left: left - 10
                });
            }
            if (e.keyCode == 39) {
                if (left >= wrapperleft2) {
                    return left
                }
                $(".zd").offset({
                    left: left + 32
                })
                $(".mefj").offset({
                    left: left + 10
                });
            }
        })


        // 敌人战机事件
        function diff(ii, ycshow) {
            // 生成敌人的数量
            this.ii = ii;
            // 生成敌人的间隔
            this.ycshow = ycshow;
            // 给每一个敌人都绑定一个计时器
            var dftime = dftime + ii;
            // 每一次敌人出现的x 位置
            var leftt = Math.floor(Math.random() * 650);
            // 初始位置
            var top = 0;
            // 创建一个定时器
            ycdsqcj = setTimeout(function() {
                // 创建敌人
                var dffj = $('<div class="dffj dffj' + ii + '"><img src="./img/enemyPlane.png"></div>')
                $('.content').append(dffj);
                // 设置初始 left 位置 （随机生成）
                $('.dffj' + ii).css({
                    left: leftt + 'px'
                });
                // 创建一个计时器
                dftime = setInterval(function() {
                    // 敌人移动事件
                    top++;
                    $('.dffj' + ii).css({
                        top: top + 'px'
                    });
                    if (top >= 520) {
                        // 当 top >= 520 时，清楚计时器
                        clearInterval(zd1);
                        clearInterval(zd2);
                        clearInterval(dftime);
                        fn()
                    }
                    // 调用子弹抨击事件
                    jz(ii, dftime)
                }, drshow)
            }, this.ycshow)
        }

        // 子弹碰到敌人时，消失
        function jz(ii, dftime) {
            // 获取敌人的移动的 top  (宽度和高度为：40;42)
            var dfftop = $('.dffj' + ii).offset().top;
            var dfftopp = dfftop - 0 + 42;
            // 获取敌人移动的 left
            var dffleft = $('.dffj' + ii).offset().left;
            var dffleftt = dffleft - 0 + 40;
            // 获取子弹1的 top
            var zdd1top = $('.zd1').offset().top;
            // 获取子弹1的 left
            var zdd1left = $('.zd1').offset().left;
            // 当子弹在一定范围内碰到敌人时，消失
            if ((zdd1top >= dfftop && zdd1top <= dfftopp) && (zdd1left >= dffleft && zdd1left <= dffleftt)) {
                $('.dffj' + ii).addClass('doow')
                clearInterval(dftime)
                defeng++
            }
        }

        function fn() {
            // 添加得分框
            var jsjm = $('<div class="fenshu" id="ffff">' + '得分为：' + defeng + '</div>');
            $('.game-defeng').append(jsjm)
            $(".content").removeClass('show')
            $('.over').addClass('show')
            $('.game-again').on('click', function() {
                defeng = 0
                $("#cooo").html('')
                $("#ffff").html('')
                $('.over').removeClass('show')
                $('.begin').addClass('show')
            })
        }
    }
})