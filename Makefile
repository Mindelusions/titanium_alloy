SRC_DIR = src
BUILD_DIR = build
PLUGIN_DIR = plugins

PREFIX = .
DIST_DIR = ${PREFIX}/dist

BASE_FILES = ${SRC_DIR}/core.js\
		${SRC_DIR}/ti.js\
		${SRC_DIR}/app.js\
		${SRC_DIR}/event.js\
		${SRC_DIR}/ui.js
		
PLUGIN_FILES = ${PLUGIN_DIR}/alloy.activity.js\
		${PLUGIN_DIR}/alloy.messageWindow.js

MODULES = ${SRC_DIR}/head.js\
		${BASE_FILES}\
		${SRC_DIR}/foot.js\
		${PLUGIN_FILES}
		
TA = ${DIST_DIR}/alloy.js
TA_MIN = ${DIST_DIR}/alloy.min.js

TA_VER = `cat version.txt`
VER = sed s/@VERSION/${TA_VER}/

RHINO = java -jar ${BUILD_DIR}/js.jar
MINJAR = java -jar ${BUILD_DIR}/compiler.jar

DATE=`date`

all: alloy lint min
	@@echo "build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}
	
alloy: ${DIST_DIR} ${TA}

${TA}: ${MODULES}
	@@echo "Building" ${TA}
	
	@@mkdir -p ${DIST_DIR}
	
	@@cat ${MODULES} | \
			sed 's/Date:./&'"${DATE}"'/' | \
			${VER} > ${TA};
			
lint: ${TA}
	@@echo "Running JSLint..."
	@@${RHINO} build/jslint-check.js
	
min: ${TA_MIN}

${TA_MIN}: ${TA}
	@@echo "Building" ${TA_MIN}
	
	@@head -10 ${TA} > ${TA_MIN}
	@@${MINJAR} --js ${TA} --warning_level QUIET >> ${TA_MIN}
	
clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}