package com.talenpal.talenpalapp.module.mainTab;

import android.content.Context;
import android.content.Intent;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.viewpager.widget.ViewPager;

import com.flyco.tablayout.CommonTabLayout;
import com.flyco.tablayout.listener.CustomTabEntity;
import com.flyco.tablayout.listener.OnTabSelectListener;
import com.talenpal.talenpalapp.ui.rn.ReactCreationActivity;
import com.talenpal.talenpalapp.util.DataUtils;

import java.util.ArrayList;
import java.util.List;

public class MainTabHelper {
    private FragmentManager fragmentManager;
    private Context context;
    private int oldPosition = 0;

    public MainTabHelper(FragmentManager fragmentManager) {
        this.fragmentManager = fragmentManager;
        // 获取Context，用于启动Activity
        if (fragmentManager.getFragments().size() > 0) {
            Fragment fragment = fragmentManager.getFragments().get(0);
            if (fragment != null) {
                this.context = fragment.getContext();
            }
        }
    }

    public void init(final ViewPager mViewPager, CommonTabLayout tablayout,
            ArrayList<TabBaseEntity> mTabEntities,
            int textSelectColor, int textDefaultColor) {
        // 从ViewPager获取Context
        this.context = mViewPager.getContext();

        List<String> mTitles = new ArrayList<>();
        ArrayList<Fragment> fragments = new ArrayList<>();
        ArrayList<CustomTabEntity> entities = new ArrayList<>();
        for (TabBaseEntity tabEntity : mTabEntities) {
            TabBaseEntity.TabEntity tabItem = tabEntity.getTabEntity();
            mTitles.add(tabItem.getTabTitle());
            fragments.add(tabItem.getFragment());
            entities.add(tabItem);
        }

        mViewPager.setAdapter(new TabPagerAdapter(fragmentManager, DataUtils.listToArrayString(mTitles), fragments));
        ArrayList<CustomTabEntity> tabData = new ArrayList<>();
        tabData.addAll(entities);
        tablayout.setTabData(tabData);
        if (textSelectColor != 0) {
            tablayout.setTextSelectColor(textSelectColor);
        }
        if (textDefaultColor != 0) {
            tablayout.setTextUnselectColor(textDefaultColor);
        }
        tablayout.setOnTabSelectListener(new OnTabSelectListener() {
            @Override
            public void onTabSelect(int position) {
                // 处理Creation标签点击（位置1）
                if (position == 1) {
                    // 启动React Native Activity
                    if (context != null) {
                        Intent intent = new Intent(context, ReactCreationActivity.class);
                        intent.putExtra(ReactCreationActivity.EXTRA_SOURCE_TAB,
                                ReactCreationActivity.SOURCE_CREATION_TAB);
                        context.startActivity(intent);
                    }
                    // 保持当前标签位置不变
                    tablayout.setCurrentTab(oldPosition);
                    return;
                }
                // 设置其他项不可点击（Call标签，位置2）
                if (position == 2) {
                    tablayout.setCurrentTab(oldPosition);
                    return;
                } else {
                    oldPosition = position;
                }
                mViewPager.setCurrentItem(position);
            }

            @Override
            public void onTabReselect(int position) {
            }
        });

        mViewPager.setCurrentItem(0);
    }
}
