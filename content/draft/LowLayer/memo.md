# アセンブリ

```c
void func(void) {
  int val = 0;
  val++;
}
```

```assembly
00000000  55                push ebp
00000001  89E5              mov ebp,esp
00000003  83EC10            sub esp,byte +0x10
00000006  C745FC00000000    mov dword [ebp-0x4],0x0
0000000D  FF45FC            inc dword [ebp-0x4]
00000010  C9                leave
00000011  C3                ret
```

`mov`でデータを移動（コピー）する。

`mov 移動先 移動元`ですので、 `mov ebp,esp`はebsからespへのデータのコピーです。

ebpは**ベースポインタ**、espは**スタックポインタ**と呼ばれるレジスターで、常にスタックのトップアドレスを表します。

[アセンブリ言語を読むための基礎知識 | 晴耕雨読](https://tex2e.github.io/blog/security/assembly-language)

`mov dword [ebp-0x4],0x0`ebp-4**から始まる**メモリー番地にコピーする。アセンブリでメモリーを扱うには`[]`を使用します。


