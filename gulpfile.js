//目的：编译sass文件
//npm  -- -- 包管理工具
//1） 引入gulp和gulp-sass两个包
var gulp = require('gulp');//本地安装为了在这里引入gulp
var sass = require('gulp-sass');


//2)编写任务
gulp.task('buildSass',function(){
	//	console.log("编译完成")
	
	//匹配
	return gulp.src('./src/sass/style.scss')
	
		//编译文件
		.pipe(sass(outputStyle("compact")))
		
		//输出文件
		.pipe(gulp.dest('./src/css'));
});


//运行任务（全局安装为了运行gulp任务）
//在命令提示符进行