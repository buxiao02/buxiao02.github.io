#!/usr/bin/env python3
"""
验证 openclaw 安装的脚本
检查 Python 包和 Node.js 命令行工具是否正常工作
"""

import sys
import subprocess
import importlib.util

def check_python_openclaw():
    """检查 Python openclaw 包"""
    try:
        spec = importlib.util.find_spec("openclaw")
        if spec is None:
            return False, "Python openclaw 包未找到"

        # 尝试导入
        import openclaw
        version = getattr(openclaw, "__version__", "未知版本")
        return True, f"Python openclaw {version} - 导入成功"
    except Exception as e:
        return False, f"Python 导入失败: {e}"

def check_node_openclaw():
    """检查 Node.js openclaw 命令行工具"""
    try:
        result = subprocess.run(
            ["openclaw", "--version"],
            capture_output=True,
            text=True,
            shell=True,
            timeout=10
        )
        if result.returncode == 0:
            version_output = result.stdout.strip()
            return True, f"openclaw 命令: {version_output}"
        else:
            return False, f"openclaw 命令失败: {result.stderr}"
    except FileNotFoundError:
        return False, "openclaw 命令未找到"
    except subprocess.TimeoutExpired:
        return False, "openclaw 命令超时"
    except Exception as e:
        return False, f"检查命令时出错: {e}"

def check_autoclaw_integration():
    """检查 AutoClaw 集成"""
    import os
    autoclaw_path = r"C:\Program Files\AutoClaw\resources\gateway\openclaw"
    if os.path.exists(autoclaw_path):
        return True, f"AutoClaw 集成: 找到 {autoclaw_path}"
    else:
        return False, "AutoClaw 集成: 未找到 openclaw 网关"

def main():
    print("=" * 60)
    print("openclaw 安装验证")
    print("=" * 60)

    results = []

    # 检查 Python 包
    py_ok, py_msg = check_python_openclaw()
    results.append(("Python 包", py_ok, py_msg))

    # 检查 Node.js 命令行工具
    node_ok, node_msg = check_node_openclaw()
    results.append(("Node.js 命令行", node_ok, node_msg))

    # 检查 AutoClaw 集成
    autoclaw_ok, autoclaw_msg = check_autoclaw_integration()
    results.append(("AutoClaw 集成", autoclaw_ok, autoclaw_msg))

    # 打印结果
    print("\n检查结果:")
    print("-" * 60)

    all_ok = True
    for component, ok, msg in results:
        status = "[OK]" if ok else "[FAIL]"
        print(f"{status} {component}: {msg}")
        if not ok:
            all_ok = False

    print("-" * 60)

    if all_ok:
        print("\n[SUCCESS] openclaw 安装成功！")
        print("所有组件都已正确安装并可以正常工作。")
        print("\n下一步:")
        print("1. 运行 'openclaw --help' 查看可用命令")
        print("2. 运行 'openclaw init' 初始化配置")
        print("3. 运行 'openclaw start' 启动网关")
    else:
        print("\n[WARNING] openclaw 安装存在问题")
        print("请检查以上错误信息，并根据需要重新安装。")
        print("\n常见解决方法:")
        print("1. 确保 Python Scripts 目录在 PATH 中")
        print("2. 确保 npm 全局二进制文件目录在 PATH 中")
        print("3. 尝试重新安装: pip install openclaw")
        print("4. 尝试重新安装: npm install -g openclaw")

    return 0 if all_ok else 1

if __name__ == "__main__":
    sys.exit(main())